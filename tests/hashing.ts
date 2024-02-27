import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Hashing } from "../target/types/hashing";

describe("hashing", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  let provider = anchor.getProvider();

  const program = anchor.workspace.Hashing as Program<Hashing>;

  it("Up vote google.com", async () => {
    let g_hash = anchor.utils.sha256.hash("google.com");
    let g_hash_key = new anchor.web3.PublicKey(g_hash);
    // Add your test here.
    let state = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("state"), g_hash_key.toBuffer()],
      program.programId
    )[0];

    const tx = await program.methods
      .upVote()
      .accounts({
        hash: g_hash_key,
        payer: provider.publicKey,
        state,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Down vote google.com", async () => {
    let g_hash = anchor.utils.sha256.hash("google.com");
    let g_hash_key = new anchor.web3.PublicKey(g_hash);
    // Add your test here.
    let state = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("state"), g_hash_key.toBuffer()],
      program.programId
    )[0];

    const tx = await program.methods
      .downVote()
      .accounts({
        hash: g_hash_key,
        payer: provider.publicKey,
        state,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
