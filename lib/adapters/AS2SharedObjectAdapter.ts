class AS2SharedObjectAdapter
{
    // should become a static
    public static getLocal(name:string, localPath:string, secure:boolean) : AS2SharedObjectAdapter
    {
        return new AS2SharedObjectAdapter();
    }

    // needs to stay as it is
    public flush() : void
    {
        // save all local data to wherever it needs to go
    }
}
export = AS2SharedObjectAdapter;