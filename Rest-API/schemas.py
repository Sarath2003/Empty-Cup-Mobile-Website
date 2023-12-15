from marshmallow import Schema, fields


class CompanySchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    rating = fields.Float(required=True)
    about = fields.Str(required=True)
    projects = fields.Int(required=True)
    experience = fields.Int(required=True)
    price = fields.Int(required=True)
    contact1 = fields.Str(required=True)
    contact2 = fields.Str(required=True)
    