export class ToDoDITokens{
      
  // Use-cases
  
  public static readonly CreateToDotUseCase: unique symbol  = Symbol('CreateToDotUseCase');
  public static readonly EditToDotUseCase: unique symbol    = Symbol('EditToDotUseCase');
  public static readonly GetToDotListUseCase: unique symbol = Symbol('GetToDotListUseCase');
  public static readonly GetToDotUseCase: unique symbol     = Symbol('GetToDotUseCase');
  public static readonly PublishToDotUseCase: unique symbol = Symbol('PublishToDotUseCase');
  public static readonly RemoveToDotUseCase: unique symbol  = Symbol('RemoveToDotUseCase');
  
  // Handlers
  
  public static readonly ToDotImageRemovedEventHandler: unique symbol = Symbol('ToDotImageRemovedEventHandler');
  
  // ToDo Repositories
  
  public static readonly ToDoRepository: unique symbol  = Symbol('ToDoRepository');
}