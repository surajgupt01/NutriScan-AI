
export type MessageType =
  | "analysis"
  | "follow_up"
  | "clarification"
  | "out_of_scope";

export type Severity = "low" | "medium" | "high";

export type RiskLevel = "low" | "medium" | "high";

export type ProcessingLevel =
  | "Minimally Processed"
  | "Processed"
  | "Ultra-Processed";

export type IngredientCategory =
  | "Preservative"
  | "Emulsifier"
  | "Sweetener"
  | "Artificial Color"
  | "Flavor Enhancer"
  | "Oil/Fat"
  | "Protein Source"
  | "Stabilizer"
  | "Whole Food Ingredient"
  | "Fortified Nutrient"
  | "Thickener";

export type AnalysisType = "new" | "follow_up";

export type EvidenceLevel =
  | "strong"
  | "moderate"
  | "limited";

export type Allergen =
  | "Milk"
  | "Soy"
  | "Gluten"
  | "Nuts"
  | "Eggs"
  | "Sesame"
  | "Shellfish";

// =========================
// Base Block
// =========================

export interface BaseBlock {
  id: string;
  type: string;
}

// =========================
// Blocks
// =========================

export interface TextBlock extends BaseBlock {
  type: "text";
  content: string;
}

export interface BulletListBlock extends BaseBlock {
  type: "bullet_list";
  title: string;
  items: string[];
}

export interface WarningBlock extends BaseBlock {
  type: "warning";
  severity: Severity;
  evidence_level?: EvidenceLevel;
  content: string;
}

export interface ScoreBlock extends BaseBlock {
  type: "score";
  label: "Health Score";
  value: number; // 0–100
  explanation: string;
}

export interface IngredientBlock extends BaseBlock {
  type: "ingredient";
  name: string;
  category: IngredientCategory | null;
  risk_level: RiskLevel;
  purpose: string | null;
  explanation: string;
  confidence?: number; // 0–1
}

export interface AllergensBlock extends BaseBlock {
  type: "allergens";
  items: Allergen[];
}

export interface ProcessingBlock extends BaseBlock {
  type: "processing";
  level: ProcessingLevel;
  reason: string;
}

export interface TableBlock extends BaseBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export interface ComparisonBlock extends BaseBlock {
  type: "comparison";
  headers: string[];
  rows: string[][];
}

// =========================
// Union
// =========================

export type PulseBlock =
  | TextBlock
  | BulletListBlock
  | WarningBlock
  | ScoreBlock
  | IngredientBlock
  | AllergensBlock
  | ProcessingBlock
  | TableBlock
  | ComparisonBlock;

// =========================
// Metadata
// =========================

export interface PulseMetadata {
  product_name?: string;
  user_preferences?: string[];
  analysis_type?: AnalysisType;
  confidence?: number; // 0–1
}

// =========================
// Root Response
// =========================

export interface PulseResponse {
  schema_version?: string;
  message_type: MessageType;
  blocks: PulseBlock[];
  metadata: PulseMetadata;
}
