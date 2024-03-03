const typeDefs = `#graphql
type Query {
    user: User!
    users: [User!]!
    doctors(userId: String): [Doctor!]!
    doctorById(doctorId: String!): Doctor!
    appointments(userId: String!): [Appointment!]!
    appointmentById(appointmentId: String!): Appointment!
    pharmacies: [Pharmacy!]!
    pharmacyById(pharmacyId: String!): Pharmacy!
    products(pharmacyId: String, categoryId: String): [Product!]!
    productById(productId: String!): Product!
    productsInCart(userId: String!): [Product!]!
    categories: [Category!]!
}

type User {
    id: String!
    fullname: String!
    email: String!
    age: Int!
    phone: String!
    role: Roles!
    verified: Boolean!
    verificationCode: String!
    token: String!
    Appointments: [Appointment!]!
    Doctors: [Doctor]!
    Plan: Plans!
}

type Doctor {
    id: String!
    fullname: String!
    email: String!
    phone: String!
    rating: Float!
    Appointments: [Appointment!]!
    # Comments: [Comment!]!
}

type Appointment {
    id: String!
    User: User!
    Doctor: Doctor!
}

type Pharmacy {
    id: String!
    name: String!
    geos: String!
    Products: [Product!]!
}

type Product {
    id: String!
    name: String!
    price: Float!
    type: MedicineType!
    Categories: [Category!]!
    Pharmacies: [Pharmacy!]!
}

type Category {
    id: String!
    name: String!
}

# type Comment {
#     id: String!
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
`;

export default typeDefs;
