# Raj Shanmugam — 38, Bengaluru, Managed Print Services Architect

## Who he is

Domain expert, not a user. He designs and operates print infrastructure
for enterprise clients — 12 years, currently running fleets of 400–3,000
devices across manufacturing and BFSI customers. He is the person who
knows what actually happens between "click Print" and "paper appears," and
almost everything PROOF assumes about that path is a browser abstraction,
not the real pipeline.

He implements PaperCut, uniFLOW, and Equitrac. He has personally built
rules that reject jobs over N pages, force duplex, and hold colour jobs
for approval. He knows the market PROOF is walking into and knows that
market's blind spot too.

## His behavior in the domain

- Measures success in click-count reduction and device uptime
- Knows blank-page suppression already exists in most PCL/PostScript drivers
  and is usually turned OFF because it breaks duplex collation
- Has never once seen a customer ask for "ink coverage per page"
- Has repeatedly seen customers ask for "why did this 900-page job go to
  the wrong printer"
- Treats the browser print path as a second-class citizen; real volume comes
  from ERP systems, batch jobs, and shared drives
- Knows toner coverage IS measured — by the device, in the MIB, after the fact

## What unites him with others

- Already has a tool and already rejected the category (shares with Angela, Dmitri)
- Wants the method exposed (shares with Priyanka, Henrik)

## What separates him

- He knows PROOF's ink model is a *pre-print estimate* of something the
  printer measures for real afterwards. He'd want to know the error bar.
- He knows the real waste in enterprise is duplicate jobs, wrong-tray, and
  abandoned pull-print — not near-empty sheets.
- He is the only persona who can tell you whether the technical premise is
  novel or a rediscovery. His answer matters more than any user's enthusiasm.
- He would immediately ask what happens to page numbering and duplex
  collation when you drop sheet 4 of 15.

## Questions for Raj

1. Blank-page suppression exists in drivers and is usually disabled. Is
   PROOF solving a problem the stack already solved badly, or one it never
   solved at all?
2. Drop sheet 4 of a 15-sheet duplex job. What actually comes out of the
   machine, and does PROOF handle it?
3. The coverage number is a pre-print estimate using a 0.16 glyph-density
   constant. Against real device-reported coverage, what's the error?
4. In your fleets, what fraction of actual waste is near-empty sheets versus
   duplicates, wrong-tray, and abandoned jobs? Is PROOF aimed at the big
   number or a small one?
5. Be honest — is this a product, a feature of a driver, or a demo?
6. Where does the MCP server change your answer, if anywhere?
