export class UserModel {
  public name: {
    title: string,
    first: string,
    last: string
  };
  public email: string;
  public picture: {
    large: string,
    medium: string,
    thumbnail: string
  };
  public location: {
    city: string,
    country: string
  }

  constructor(
    name: {
      title: string,
      first: string,
      last: string
    },
    email: string,
    picture: {
      large: string,
      medium: string,
      thumbnail: string
    },
    location: {
      city: string,
      country: string
    }
  ) {
    this.name = name;
    this.email = email;
    this.picture = picture;
    this.location = location;
  }
}



