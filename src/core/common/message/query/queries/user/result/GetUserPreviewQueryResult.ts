
export class GetUserPreviewQueryResult {
  
  public readonly id: string;
  
  public readonly username: string;
  
  
  constructor(id: string, name: string) {
    this.id = id;
    this.username = name;
  }
  
  public static new(id: string, username: string): GetUserPreviewQueryResult {
    return new GetUserPreviewQueryResult(id, username);
  }
  
}
