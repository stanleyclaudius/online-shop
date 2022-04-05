export const authEmailFormat = (text: string, url: string) => {
  const data = `
    <div style="border: 5px solid #ccc; padding: 15px;">
      <h1 style="text-align: center;">Sneakershub ${text}</h1>
      <p>Please click below button to proceed the chosen action</p>
      <a style="display: block; text-decoration: none; background: orange; color: #fff; width: 130px; height: 35px; text-align: center; line-height: 35px; margin-top: 15px" href=${url}>Click Me</a>
      <div style="margin-top: 20px;">
        <p>Thank you for using <strong>Sneakershub</strong> for buying your favorite sneakers
        <p>Warm Regards,</p>
        <p>- Sneakershub Team -</p>
      </div>
    </div>
  `
  
  return data
}