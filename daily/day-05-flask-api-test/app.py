from flask import Flask, request, jsonify 

app = Flask(__name__)

FOODS = []

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/foods")
def foods():
    return {"foods": []}

@app.post("/foods")
def add_food():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()

    if not name: 
        return jsonify({"error": "Field 'name' is required"})
    
    if any(f.lower() == name.lower() for f in FOODS):
        return jsonify({"error": "Food already exists"}), 409
    
    FOODS.append(name)
    return {"added": name, "count": len(FOODS)}, 201

if __name__ == "__main__":
    app.run(debug=True)