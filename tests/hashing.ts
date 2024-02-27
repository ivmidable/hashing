import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { createHash } from "crypto";
import { Hashing } from "../target/types/hashing";

describe("hashing", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  let provider = anchor.getProvider();

  const program = anchor.workspace.Hashing as Program<Hashing>;

  const hash = createHash("sha256");
  hash.update(Buffer.from("google.com"));
  let hash_key = new anchor.web3.PublicKey(hash.digest());

  let state = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("state"), hash_key.toBuffer()],
    program.programId
  )[0];

  it("Up vote google.com", async () => {
    const tx = await program.methods
      .upVote()
      .accounts({
        hash: hash_key,
        payer: provider.publicKey,
        state,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Down vote google.com", async () => {
    // Add your test here.
    let state = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("state"), hash_key.toBuffer()],
      program.programId
    )[0];

    const tx = await program.methods
      .downVote()
      .accounts({
        hash: hash_key,
        payer: provider.publicKey,
        state,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
