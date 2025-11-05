"""
🏗️ AI Verification Prompt Templates for TownPlanPay
---------------------------------------------------
Advanced prompt engineering for milestone verification in municipal infrastructure projects.

This module defines AI prompt templates for verifying milestone evidence such as photos,
GPS data, and project descriptions. It supports modular verification for different
project types (road, building, etc.) and includes fraud detection checks.

Author: Wipernation Team
Version: 1.2.0
Last Updated: 2025-10-25
"""

# ==============================================================
# 🔹 MAIN VERIFICATION PROMPT
# ==============================================================

MILESTONE_VERIFICATION_PROMPT = """
You are an AI infrastructure project verifier for TownPlanPay.

ANALYZE this construction milestone evidence:

PROJECT DETAILS:
- Project: {project_name}
- Milestone: {milestone_type}
- Location: {gps_coordinates}

EVIDENCE PROVIDED:
- Photos: {photo_count} images
- Work Description: {work_description}
- Additional Context: {additional_data}

VERIFICATION CRITERIA:
1. EVIDENCE QUALITY: Photos show clear, relevant construction progress.
2. LOCATION VERIFICATION: GPS coordinates match the project site.
3. MILESTONE COMPLETION: Work description aligns with the claimed milestone.
4. RISK ASSESSMENT: Check for potential fraud indicators.

ANALYSIS REQUIREMENTS:
- Compare evidence against milestone requirements.
- Assess photo quality and relevance.
- Verify location consistency.
- Identify any red flags.

RESPONSE FORMAT (JSON):
{
    "approved": boolean,
    "confidence_score": float (0.0 - 1.0),
    "confidence_label": "High | Medium | Low | Reject",
    "rationale": "Detailed explanation",
    "suggested_amount": integer (if approved),
    "improvement_suggestions": ["list", "of", "suggestions"],
    "prompt_version": "1.2.0"
}

Now analyze the provided evidence:
"""

# ==============================================================
# 🔹 PROJECT TYPE-SPECIFIC PROMPTS
# ==============================================================

ROAD_CONSTRUCTION_PROMPT = """
SPECIFIC ROAD CONSTRUCTION CHECKS:
- Verify proper grading and leveling in photos.
- Check for drainage system installation.
- Confirm material quality visibility.
- Ensure safety measures are visible.
"""

BUILDING_CONSTRUCTION_PROMPT = """
SPECIFIC BUILDING CONSTRUCTION CHECKS:
- Verify foundation work completion.
- Check structural element visibility.
- Confirm material delivery evidence.
- Ensure compliance with building plans.
"""

# ==============================================================
# 🔹 FRAUD DETECTION PROMPT
# ==============================================================

FRAUD_DETECTION_PROMPT = """
FRAUD DETECTION CHECKS:
- Photo metadata consistency (timestamps, GPS).
- Evidence authenticity indicators.
- Work progression logic.
- Location verification.
"""

# ==============================================================
# 🔹 PROMPT GENERATION FUNCTION
# ==============================================================

def get_verification_prompt(project_type: str = "general") -> str:
    """
    Get the full verification prompt template based on project type.

    Args:
        project_type (str): Type of project ('road_construction', 'building_construction', or 'general').

    Returns:
        str: Complete prompt string for AI verification.
    """
    base_prompt = MILESTONE_VERIFICATION_PROMPT

    if project_type == "road_construction":
        base_prompt += ROAD_CONSTRUCTION_PROMPT
    elif project_type == "building_construction":
        base_prompt += BUILDING_CONSTRUCTION_PROMPT

    base_prompt += FRAUD_DETECTION_PROMPT
    return base_prompt

# ==============================================================
# 🔹 CONFIDENCE SCORING LOGIC
# ==============================================================

CONFIDENCE_THRESHOLDS = {
    "high_confidence": 0.85,
    "medium_confidence": 0.70,
    "low_confidence": 0.50,
    "rejection_threshold": 0.30
}

def get_confidence_label(score: float) -> str:
    """
    Convert a numerical confidence score into a human-readable label.
    """
    if score >= CONFIDENCE_THRESHOLDS["high_confidence"]:
        return "High"
    elif score >= CONFIDENCE_THRESHOLDS["medium_confidence"]:
        return "Medium"
    elif score >= CONFIDENCE_THRESHOLDS["low_confidence"]:
        return "Low"
    else:
        return "Reject"
