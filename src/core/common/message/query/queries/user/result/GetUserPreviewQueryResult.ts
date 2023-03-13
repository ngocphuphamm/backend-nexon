
export class GetUserPreviewQueryResult {
  
  public readonly id: string;
  
  public readonly email: string;
  
  
  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }
  
  public static new(id: string, email: string): GetUserPreviewQueryResult {
    return new GetUserPreviewQueryResult(id, email);
  }
  
}
