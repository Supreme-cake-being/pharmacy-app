const typeDefs = `#graphql
type Query {
    me: User!
    users: [User!]! 
    doctors: [Doctor!]!
    doctorById(doctorId: String!): Doctor!
    appointments(doctorId: String): [Appointment!]!
    appointmentById(appointmentId: String!): Appointment!
    pharmacies: [Pharmacy!]!
    pharmacyById(pharmacyId: String!): Pharmacy!
    products(pharmacyId: String, categoryId: String): [Product!]!
    productById(productId: String!): Product!
    categories: [Category!]!
}

type Mutation {
    signup(record: UserSignUpInput!): User!
    login(record: UserLoginInput!): LoginResponse!
    logout: String!
    doctorCreate(record: DoctorCreateInput!): Doctor!
    doctorUpdate(record: DoctorUpdateInput!): Doctor!
    doctorDelete(id: String!): Boolean!
    appointmentCreate(record: AppointmentCreateInput!): Appointment!
    appointmentUpdate(record: AppointmentUpdateInput!): Appointment!
    appointmentDelete(id: String!): Boolean!
    productCreate(record: ProductCreateInput!): Product!
    productUpdate(record: ProductUpdateInput!): Product!
    productDelete(id: String!): Boolean!
    pharmacyCreate(record: PharmacyCreateInput!): Pharmacy!
    pharmacyUpdate(record: PharmacyUpdateInput!): Pharmacy!
    pharmacyDelete(id: String!): Boolean!
}

type LoginResponse {
    token: String!
}

type User {
    _id: String!
    fullName: String!
    email: String!
    age: Int!
    phone: String!
    role: Roles!
    verified: Boolean!
    verificationCode: String!
    Appointments: [Appointment!]!
    Doctors: [Doctor]!
    Plan: Plans!
}

type Doctor {
    _id: String!
    fullName: String!
    email: String!
    phone: String!
    rating: Float!
    Users: [User!]!
    Appointments: [Appointment!]!
    # Comments: [Comment!]!
}

type Appointment {
    _id: String!
    time: String!
    User: User!
    Doctor: Doctor!
}

type Pharmacy {
    _id: String!
    name: String!
    geos: String!
    Products: [Product!]!
}

type Product {
    _id: String!
    name: String!
    price: Float!
    type: MedicineType!
    category: Category!
    Pharmacy: Pharmacy!
}

# type Comment {
#     _id: String!
#     title: String!
#     body: String!
#     User: User!
#     Doctor: Doctor!
# }

enum Roles {
    ROLE_USER
    ROLE_DOCTOR
}

enum Plans {
    PLAN_FREE
    PLAN_FAMILY_INSURANCE
    PLAN_LIFE_INSURANCE
}

enum MedicineType {
    MEDICINE_TYPE_LIQUID
    MEDICINE_TYPE_TABLET
    MEDICINE_TYPE_CAPSULES
    MEDICINE_TYPE_INHALERS
    MEDICINE_TYPE_INJECTIONS
}

enum Category {
    WITH_PRESCRIPTION
    WITHOUT_PRESCRIPTION
}

input UserSignUpInput {
    fullName: String!
    email: String!
    password: String!
    age: Int!
    phone: String!
}

input UserLoginInput {
    email: String!
    password: String!
}

input DoctorCreateInput {
    fullName: String!
    email: String!
    phone: String!
}

input DoctorUpdateInput {
    id: String!
    fullName: String
    email: String
    phone: String
    rating: Int
}

input AppointmentCreateInput {
    time: String!
    doctorId: String!
}

input AppointmentUpdateInput {
    id: String!
    time: String!
}

input ProductCreateInput {
    name: String!
    price: Float!
    type: MedicineType!
    category: Category!
    pharmacyId: String!
}

input ProductUpdateInput {
    id: String!
    name: String
    price: Float
    type: MedicineType
    category: Category
}

input PharmacyCreateInput {
    name: String!
    geos: String!
}

input PharmacyUpdateInput {
    id: String!
    name: String
    geos: String
}
`;

export default typeDefs;
