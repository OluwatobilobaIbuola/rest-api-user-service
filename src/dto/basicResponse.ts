export class BasicResponse {
  private readonly status: boolean;
  private readonly statusCode: number;
  private readonly message: string;
  private readonly data: any;

  constructor(
    status: boolean,
    statusCode: number,
    message: string,
    data?: any
  ) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  get getData(): any {
    return this.data;
  }

  get getMessage(): string {
    return this.message;
  }

  get getStatus(): boolean {
    return this.status;
  }

  get getStatusCode(): number {
    return this.statusCode;
  }
}
