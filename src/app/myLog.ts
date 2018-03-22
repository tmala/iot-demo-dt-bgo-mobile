export class MyLog {
  public static LOGLEVEL_FATAL = 5;
  public static LOGLEVEL_ERROR = 4;
  public static LOGLEVEL_INFO  = 3;
  public static LOGLEVEL_DEBUG = 2;
  public static LOGLEVEL_TRACE = 1;

  private static currentLoglevel = MyLog.LOGLEVEL_ERROR;

  public static isTrace(): boolean {
    return this.currentLoglevel <= MyLog.LOGLEVEL_TRACE;
  }
  public static isDebug(): boolean {
    return this.currentLoglevel <= MyLog.LOGLEVEL_DEBUG;
  }
  public static isInfo(): boolean {
    return this.currentLoglevel <= MyLog.LOGLEVEL_INFO;
  }
  public static isError(): boolean {
    return this.currentLoglevel <= MyLog.LOGLEVEL_ERROR;
  }
  public static isFatal(): boolean {
    return this.currentLoglevel <= MyLog.LOGLEVEL_FATAL;
  }

  public static setCurrentLoglevel(newLoglevel: number): void {
    if (newLoglevel >= MyLog.LOGLEVEL_TRACE && newLoglevel <= MyLog.LOGLEVEL_FATAL) {
      MyLog.currentLoglevel = newLoglevel;
    } else {
      console.error('New LogLevel is not valid (' + newLoglevel + ')');
    }
  }

}
