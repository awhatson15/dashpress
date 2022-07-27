export type SupportedDatabaseTypes = "postgres" | "mysql" | "mssql" | "sqlite";

export type IDBCrendentials = {
  databaseType: SupportedDatabaseTypes;
  host: string;
  user: string;
  password: string;
  schemaNames: string[];
  database: string;
  port: number;
  ssl: boolean;
};

export interface IMailCredentials {
  host: string;
  user: string;
  password: string;
  ssl: boolean;
}

export const CREDENTIALS_DOMAINS = { database: "database" };
