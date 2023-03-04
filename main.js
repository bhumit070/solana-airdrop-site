import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const button = document.getElementById('get_airdrop_button')
const walletAddressInput = document.getElementById('wallet_address_input')

function toggleDisable(isDisabled = true) {
  button.disabled = isDisabled
  walletAddressInput.disabled = isDisabled
}

button.addEventListener('click', async () => {
  try {
    toggleDisable()
    const address = walletAddressInput.value
    if (!address) {
      return window.alert('Please enter a wallet address')
    }
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const myAddress = new PublicKey(address);
    const signature = await connection.requestAirdrop(myAddress, LAMPORTS_PER_SOL);
    await connection.confirmTransaction(signature);

  } catch (error) {
    console.error(error)
    window.alert(error.message || "Something went wrong!, please try again later.")
  } finally {
    toggleDisable(false)
  }
})