import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubmitKidAssessmentDto } from "./dto/submit-kid-assessment.dto";
import { KidAssessment } from "./entities/kid-assessment.entity";

export interface KidAssessmentResponse {
  id: string;
  childAge: number;
  score: number;
  maxScore: number;
  readinessLevel: "developing" | "ready" | "advanced";
  recommendation: string;
  suggestedCourseSlug: string;
}

const MAX_SCORE = 20;

const READINESS_THRESHOLDS = {
  developing: 8,
  ready: 14,
} as const;

@Injectable()
export class AssessmentsService {
  private readonly logger = new Logger(AssessmentsService.name);

  constructor(
    @InjectRepository(KidAssessment)
    private readonly assessmentsRepository: Repository<KidAssessment>,
  ) {}

  async submit(dto: SubmitKidAssessmentDto): Promise<KidAssessmentResponse> {
    const score = this.calculateScore(dto.answers);
    const readinessLevel = this.resolveReadiness(score);
    const recommendation = this.buildRecommendation(readinessLevel, dto.childAge);

    const saved = await this.assessmentsRepository.save(
      this.assessmentsRepository.create({
        parentEmail: dto.parentEmail?.trim().toLowerCase() ?? null,
        childAge: dto.childAge,
        answers: dto.answers,
        score,
        readinessLevel,
        recommendation,
      }),
    );

    this.logger.log(`Kid assessment saved: ${saved.id} (score ${score})`);

    return {
      id: saved.id,
      childAge: saved.childAge,
      score: saved.score,
      maxScore: MAX_SCORE,
      readinessLevel,
      recommendation: saved.recommendation,
      suggestedCourseSlug: "logical-reasoning-scratch",
    };
  }

  private calculateScore(answers: Record<string, string>): number {
    const weights: Record<string, number> = {
      q1: 4,
      q2: 4,
      q3: 4,
      q4: 4,
      q5: 4,
    };

    return Object.entries(weights).reduce((total, [key, weight]) => {
      const answer = answers[key];
      if (answer === "yes" || answer === "often" || answer === "confident") {
        return total + weight;
      }
      if (answer === "sometimes" || answer === "neutral") {
        return total + Math.floor(weight / 2);
      }
      return total;
    }, 0);
  }

  private resolveReadiness(
    score: number,
  ): "developing" | "ready" | "advanced" {
    if (score >= READINESS_THRESHOLDS.ready) {
      return "advanced";
    }
    if (score >= READINESS_THRESHOLDS.developing) {
      return "ready";
    }
    return "developing";
  }

  private buildRecommendation(
    level: "developing" | "ready" | "advanced",
    childAge: number,
  ): string {
    if (level === "advanced") {
      return `Your ${childAge}-year-old shows strong logical thinking and curiosity — they're an excellent fit for our Logical Reasoning & Scratch course with live weekly sessions.`;
    }
    if (level === "ready") {
      return `Your child is ready to begin structured Scratch learning with guided live classes. Our course builds confidence step by step with fun projects.`;
    }
    return `Your child would benefit from starting with our gentle Scratch introduction — we focus on play-based logic building before moving to harder concepts.`;
  }
}
