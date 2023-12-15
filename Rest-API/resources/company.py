from flask_smorest import Blueprint, abort
from flask.views import MethodView
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from schemas import CompanySchema
from models import CompanyModel


blp = Blueprint("Companies", __name__, description="Operation on companies")


@blp.route("/company/<string:company_id>")
class Company(MethodView):
    @blp.response(200, CompanySchema)
    def get(self, company_id):
        company = CompanyModel.query.get_or_404(company_id)
        return company

    def delete(self, company_id):
        company = CompanyModel.query.get_or_404(company_id)
        db.session.delete(company)
        db.session.commit()
        return {"message": "Company deleted."}



@blp.route('/company')
class CompanyList(MethodView):
    @blp.response(200, CompanySchema(many=True))
    def get(self):
        return CompanyModel.query.all()
    

    @blp.arguments(CompanySchema)
    @blp.response(201, CompanySchema)
    def post(self, company_data):
        company = CompanyModel(**company_data)
        try:
            db.session.add(company)
            db.session.commit()
        except IntegrityError:
            abort(400, message="A company with that name already exists.")
        except SQLAlchemyError:
            abort(500, message="An error occured while inserting the data")

        return company