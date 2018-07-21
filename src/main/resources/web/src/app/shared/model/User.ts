export class User {
    name: string;
    id: string;
    roleDescription: string;
    location: string;
  
    constructor(name: string, id: string, roleDescription: string, location: string) {
      this.name = name;
      this.id = id;
      this.roleDescription = roleDescription;
      this.location = location;
    }
  }