import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
   principal: {
      width: "100vw",
      height: "100vh",
      background: "blue",
      color: "blue",
   },
   secundaria: {
      width: "50vw",
      height: "50vh",
      background: "red",
      color: "red",
   }
})

function TelaInicial(classe) {
   return (
         <div className={classe.principal}>
            <div className={classe.secundaria}>
a
            </div>
         </div>
   )
}


export default withStyles(styles)(TelaInicial);
