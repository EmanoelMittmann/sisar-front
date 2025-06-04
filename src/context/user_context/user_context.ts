class UserContext {
  private user: string | null = null;

  getUser(): string | null {
    return this.user;
  }

  setUser(id: string) {
    this.user = id;
  }
}

export const user_context = new UserContext();
