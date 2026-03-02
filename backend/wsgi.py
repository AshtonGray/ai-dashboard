"""
Flask backend for AI Engineering offerings API.
"""
import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder="static", static_url_path="")
CORS(app)

# Serve React app for all non-API routes (must be last route)
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    # Don't serve static files for API routes
    if path.startswith("api"):
        return jsonify({"error": "Not found"}), 404

    # Static folder may not exist when running backend alone (e.g. local dev)
    if not os.path.isdir(app.static_folder):
        return jsonify({"error": "Not found"}), 404

    # Serve static files if they exist
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)

    # Serve index.html for all other routes (React Router)
    return send_from_directory(app.static_folder, "index.html")



PRODUCTS = [
    {
        "type": "product",
        "slug": "ai-platform",
        "name": "AI Platform",
        "logo": {"text": "AP"},
        "shortDescription": "Unified platform for training, deploying, and monitoring machine learning models at scale.",
        "status": "available",
        "details": [
            "Supports multiple frameworks and runtimes",
            "End-to-end ML lifecycle from experiment to production",
            "Built-in monitoring and model registry",
        ],
        "currentState": {
            "eligibility": "All engineering teams",
            "access": "Self-service via onboarding",
            "support": "Documentation and Slack channel",
        },
        "materials": [
            {"label": "Evaluation notes", "href": "#", "gated": False},
            {"label": "Architecture overview", "href": "#", "gated": False},
        ],
        "actions": [
            {"label": "Self-service onboarding", "href": "#onboard", "kind": "primary"},
        ],
        "lastUpdated": "2025-02-15",
    },
    {
        "type": "product",
        "slug": "ml-governance",
        "name": "ML Governance",
        "logo": {"text": "MG"},
        "shortDescription": "Policy, compliance, and model risk management for AI systems.",
        "status": "pilot",
        "details": [
            "Track lineage, fairness, and explainability",
            "Policy enforcement and compliance reporting",
            "Model risk and validation workflows",
        ],
        "currentState": {
            "eligibility": "Pilot teams by invitation",
            "access": "Request via pilot list",
            "support": "Dedicated pilot support",
        },
        "materials": [
            {"label": "Pilot scope", "href": "#", "gated": True},
            {"label": "Evaluation notes", "href": "#", "gated": False},
        ],
        "actions": [{"label": "Join pilot list", "href": "#pilot", "kind": "primary"}],
        "lastUpdated": "2025-02-10",
    },
    {
        "type": "product",
        "slug": "ai-studio",
        "name": "AI Studio",
        "logo": {"text": "AS"},
        "shortDescription": "Notebooks, experiments, and quick prototypes with shared compute.",
        "status": "evaluation",
        "details": [
            "Integrates with version control",
            "Shared GPU and CPU compute",
            "Experiment tracking and comparison",
        ],
        "currentState": {
            "eligibility": "Under evaluation",
            "access": "Join waitlist",
            "support": "Limited documentation",
        },
        "materials": [
            {"label": "Evaluation notes", "href": "#", "gated": False},
            {"label": "Feature comparison", "href": "#", "gated": False},
        ],
        "actions": [{"label": "Join pilot list", "href": "#pilot", "kind": "primary"}],
        "lastUpdated": "2025-02-01",
    },
]

LEARNING_PATHS = [
    {
        "type": "learning",
        "slug": "ai-fundamentals",
        "title": "AI Engineering Fundamentals",
        "status": "available",
        "overview": "Core concepts: data pipelines, model training, deployment, and monitoring. Hands-on labs and capstone project. From zero to production-ready in 8 weeks.",
        "modules": [
            {"title": "Data & features", "href": "#"},
            {"title": "Training & tuning", "href": "#"},
            {"title": "Deployment", "href": "#"},
            {"title": "Monitoring", "href": "#"},
        ],
        "materials": [
            {"label": "Syllabus", "href": "#", "gated": False},
            {"label": "Lab environment guide", "href": "#", "gated": False},
        ],
        "actions": [{"label": "Enroll", "href": "#enroll", "kind": "primary"}],
        "lastUpdated": "2025-02-12",
    },
    {
        "type": "learning",
        "slug": "advanced-ml-ops",
        "title": "Advanced MLOps",
        "status": "pilot",
        "overview": "CI/CD for ML, feature stores, A/B testing, and incident response. For engineers who already ship models. Scale and automate in 6 weeks.",
        "modules": [
            {"title": "CI/CD for ML", "href": "#"},
            {"title": "Feature stores", "href": "#"},
            {"title": "Experimentation", "href": "#"},
            {"title": "Incident response", "href": "#"},
        ],
        "materials": [
            {"label": "Pilot curriculum", "href": "#", "gated": True},
        ],
        "actions": [{"label": "Join pilot list", "href": "#pilot", "kind": "primary"}],
        "lastUpdated": "2025-02-08",
    },
]


@app.route("/api/products", methods=["GET"])
def get_products():
    return jsonify(PRODUCTS)


@app.route("/api/products/<slug>", methods=["GET"])
def get_product(slug):
    for p in PRODUCTS:
        if p["slug"] == slug:
            return jsonify(p)
    return jsonify({"error": "Not found"}), 404


@app.route("/api/learning-paths", methods=["GET"])
def get_learning_paths():
    return jsonify(LEARNING_PATHS)


@app.route("/api/learning-paths/<slug>", methods=["GET"])
def get_learning_path(slug):
    for lp in LEARNING_PATHS:
        if lp["slug"] == slug:
            return jsonify(lp)
    return jsonify({"error": "Not found"}), 404


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
