from db import db

class CompanyModel(db.Model):
    __tablename__ = "company"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    rating = db.Column(db.Float(precision=1), unique=False, nullable=False)
    about = db.Column(db.String, unique=False, nullable=False)
    projects = db.Column(db.Integer, unique=False, nullable=False)
    experience = db.Column(db.Integer, unique=False, nullable=False)
    price = db.Column(db.Integer, unique=False, nullable=False)
    contact1 = db.Column(db.String, unique=False, nullable=False)
    contact2 = db.Column(db.String, unique=False, nullable=False)