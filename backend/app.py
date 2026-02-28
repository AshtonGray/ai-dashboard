"""
Flask backend for AI Engineering offerings API.
"""
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

# Mock data: offerings, products, learning paths
OFFERINGS = [
    {
        "id": "products",
        "title": "Products & Tools",
        "description": "AI engineering products and platforms for building, deploying, and governing AI systems.",
        "href": "/#products",
        "count": 3,
    },
    {
        "id": "learning-paths",
        "title": "Learning Paths",
        "description": "Structured curricula to grow from fundamentals to advanced AI engineering.",
        "href": "/#learning-paths",
        "count": 2,
    },
]

PRODUCTS = [
    {
        "id": "ai-platform",
        "name": "AI Platform",
        "tagline": "End-to-end ML lifecycle",
        "logo": "/images/logo-platform.svg",
        "description": "Unified platform for training, deploying, and monitoring machine learning models at scale. Supports multiple frameworks and runtimes.",
        "state": "available",
        "stateLabel": "Available",
        "materials": [
            {"title": "Evaluation notes", "url": "#", "type": "doc"},
            {"title": "Architecture overview", "url": "#", "type": "doc"},
        ],
        "actions": [
            {"label": "Self-service onboarding", "url": "#onboard", "primary": True},
        ],
    },
    {
        "id": "ml-governance",
        "name": "ML Governance",
        "tagline": "Responsible AI controls",
        "logo": "/images/logo-governance.svg",
        "description": "Policy, compliance, and model risk management for AI systems. Track lineage, fairness, and explainability.",
        "state": "pilot",
        "stateLabel": "Pilot",
        "materials": [
            {"title": "Pilot scope", "url": "#", "type": "doc"},
            {"title": "Evaluation notes", "url": "#", "type": "doc"},
        ],
        "actions": [
            {"label": "Join pilot list", "url": "#pilot", "primary": True},
        ],
    },
    {
        "id": "ai-studio",
        "name": "AI Studio",
        "tagline": "Experiment and prototype",
        "logo": "/images/logo-studio.svg",
        "description": "Notebooks, experiments, and quick prototypes. Integrates with version control and shared compute.",
        "state": "evaluation",
        "stateLabel": "Evaluation",
        "materials": [
            {"title": "Evaluation notes", "url": "#", "type": "doc"},
            {"title": "Feature comparison", "url": "#", "type": "doc"},
        ],
        "actions": [
            {"label": "Join pilot list", "url": "#pilot", "primary": True},
        ],
    },
]

LEARNING_PATHS = [
    {
        "id": "ai-fundamentals",
        "name": "AI Engineering Fundamentals",
        "tagline": "From zero to production-ready",
        "description": "Core concepts: data pipelines, model training, deployment, and monitoring. Hands-on labs and capstone project.",
        "duration": "8 weeks",
        "topics": ["Data & features", "Training & tuning", "Deployment", "Monitoring"],
        "state": "available",
        "stateLabel": "Available",
        "actions": [{"label": "Enroll", "url": "#enroll", "primary": True}],
    },
    {
        "id": "advanced-ml-ops",
        "name": "Advanced MLOps",
        "tagline": "Scale and automate ML systems",
        "description": "CI/CD for ML, feature stores, A/B testing, and incident response. For engineers who already ship models.",
        "duration": "6 weeks",
        "topics": ["CI/CD", "Feature stores", "Experimentation", "Incident response"],
        "state": "pilot",
        "stateLabel": "Pilot",
        "actions": [{"label": "Join pilot list", "url": "#pilot", "primary": True}],
    },
]


@app.route("/api/offerings", methods=["GET"])
def get_offerings():
    return jsonify(OFFERINGS)


@app.route("/api/products", methods=["GET"])
def get_products():
    return jsonify(PRODUCTS)


@app.route("/api/products/<product_id>", methods=["GET"])
def get_product(product_id):
    for p in PRODUCTS:
        if p["id"] == product_id:
            return jsonify(p)
    return jsonify({"error": "Not found"}), 404


@app.route("/api/learning-paths", methods=["GET"])
def get_learning_paths():
    return jsonify(LEARNING_PATHS)


@app.route("/api/learning-paths/<path_id>", methods=["GET"])
def get_learning_path(path_id):
    for lp in LEARNING_PATHS:
        if lp["id"] == path_id:
            return jsonify(lp)
    return jsonify({"error": "Not found"}), 404


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
