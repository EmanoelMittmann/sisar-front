class UserContext {
  private user: string | null = null;
  private token: string | null = null;

  getUser(): string | null {
    return this.user;
  }

  setUser(id: string) {
    this.user = id;
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }
}

export const user_context = new UserContext();
