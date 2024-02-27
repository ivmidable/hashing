use anchor_lang::prelude::*;

declare_id!("8D7RJeXVsAmNzSoyauS4JyeBawoU8HDa2C4RATAkNQ23");

#[program]
pub mod hashing {
    use super::*;

    pub fn up_vote(ctx: Context<Vote>) -> Result<()> {
        ctx.accounts.state.votes += 1;
        Ok(())
    }

    pub fn down_vote(ctx: Context<Vote>) -> Result<()> {
        ctx.accounts.state.votes -= 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    /// CHECK: this is fine.
    pub hash: UncheckedAccount<'info>,
    #[account(init_if_needed, payer= payer, seeds=[b"state", hash.key().as_ref()], bump, space = 8+8)]
    pub state: Account<'info, State>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct State {
    votes: u64,
}
