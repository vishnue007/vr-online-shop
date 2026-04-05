type LoginResponse = {
  login: {
    token: string;
    admin: {
      id: string;
      email: string;
      role: string;
    };
  };
};

type LoginVariables = {
  email: string;
  password: string;
};

export type { LoginResponse, LoginVariables };