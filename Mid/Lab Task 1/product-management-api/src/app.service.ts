import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getInfo() {
    return {
      name: "Product Management API",
      course: "Advanced Programming in Web Technology",
      task: "Lab Task 1",
      student: {
        sl: 8,
        name: "Musa Abdullah",
        id: "22-49674-3",
        section: "B",
      },
      endpoints: {
        products: [
          "POST   /products",
          "GET    /products",
          "GET    /products/:id",
          "PATCH  /products/:id",
          "DELETE /products/:id",
        ],
        employees: [
          "POST   /employees",
          "GET    /employees",
          "GET    /employees/:id",
          "PATCH  /employees/:id",
          "DELETE /employees/:id",
        ],
      },
    };
  }
}
