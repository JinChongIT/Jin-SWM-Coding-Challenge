export class WriterDatabase { //SELF NOTE: Is this class really needed only two functions? Yes, because what if client wants to get the original writer? Having the logic here promotes reuse
    private writersList: Array<string> = []; //SELF NOTE: Why not assign in constructor? Adheres to Field initializers coding standard 

    AddWriter(newWriter: string) { //SELF NOTE: Why not add this implemention into article class? Because violates S in Solid
        if(newWriter !== "") {
            this.writersList.push(newWriter);
        } else {
           throw new Error("error: writer needs to have a name");
        }
    }

    get WritersList(): Array<string> { //SELF NOTE: Doesn't this violate encapsulation? Yes, but class/method is not for client to use but for article class which will encapsulates this return
        return this.writersList;
    }

}