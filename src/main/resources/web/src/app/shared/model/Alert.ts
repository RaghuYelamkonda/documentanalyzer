export class Alert {
    id: number;
    type: string;
    message: string;

    constructor(type: string, id: number, message: string) {
      this.type = type;
      this.id = id;
      this.message = message;
    }
  }