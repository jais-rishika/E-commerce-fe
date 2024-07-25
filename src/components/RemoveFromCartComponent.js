import { Button } from "react-bootstrap"

export const RemoveFromCartComponent=({productID,price,quantity,orderCreated,removeFromCartHandler=false})=>{
    return(
        <Button
            disabled={orderCreated}
            type="button"
            variant="secondary"
            onClick={removeFromCartHandler? ()=> removeFromCartHandler(productID,price,quantity): undefined}
        >
            <i className="bi bi-trash"></i>  
        </Button>
    )
}