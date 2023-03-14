export class ToDoDITokens{
      
  // Use-cases
  
  public static readonly CreateToDoUseCase: unique symbol  = Symbol('CreateToDoUseCase');
  public static readonly EditToDoUseCase: unique symbol    = Symbol('EditToDoUseCase');
  public static readonly GetToDoListUseCase: unique symbol = Symbol('GetToDotListUseCase');
  public static readonly GetToDoUseCase: unique symbol     = Symbol('GetToDotUseCase');
  public static readonly RemoveToDoUseCase: unique symbol  = Symbol('RemoveToDoUseCase');
  
  // Handlers
  
  public static readonly ToDotImageRemovedEventHandler: unique symbol = Symbol('ToDotImageRemovedEventHandler');
  
  // ToDo Repositories
  
  public static readonly ToDoRepository: unique symbol  = Symbol('ToDoRepository');
}