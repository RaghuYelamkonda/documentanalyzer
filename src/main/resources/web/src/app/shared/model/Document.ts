export class Document {
    name: string;
    id: string;
    description: string;
    userId: string;
    selected: boolean;
  
    constructor(name: string, id: string, description: string, userId: string) {
      this.name = name;
      this.id = id;
      this.description = description;
      this.userId = userId;
    }
  }