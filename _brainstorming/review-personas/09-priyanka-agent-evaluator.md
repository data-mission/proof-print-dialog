# Priyanka Rao — 33, Seattle, AI Infrastructure Engineer, Agent Tooling

## Who she is

Builds agent tooling at a developer-platform company: MCP servers, tool
schemas, evals for tool-calling reliability. She has written eleven MCP
servers and deleted six of them. Her strong opinion, formed the hard way,
is that most MCP servers are REST APIs with worse documentation, and that
a tool is only worth exposing if an agent can accomplish something with it
that it could not accomplish by reading a file.

She evaluates PROOF on one axis: does an agent calling `waste_report()`
get information it could not get otherwise? For PROOF, unusually, the
answer might be yes — pagination and ink coverage require a layout engine,
which an LLM does not have. That is a real reason for the tool to exist.

## Her behavior with agent tools

- Reads the tool schema before the README
- Tests whether tool descriptions are written for a model or for a human
- Checks whether the server is stateful and whether that state is coherent
  across calls
- Rejects any tool whose output is prose when it should be structured
- Cares deeply about whether the tool returns evidence or assertions
- Distrusts "we also have an MCP server" as a positioning move

## What unites her with others

- Demands the method, not the claim (shares with Raj, Henrik, Dmitri)
- Judges within seconds, on craft signals (shares with Ife, Tomás)

## What separates her

- She is the only persona who can assess whether PROOF's agentic claim is
  load-bearing or decorative.
- She would note immediately that the MCP server is *entirely invisible*
  in the UI — there is no agent surface on screen at all — which means an
  AI judge looking at screenshots will never learn it exists.
- She'd ask the sharpest architectural question: is the MCP server running
  the same pagination engine as the browser, or a reimplementation that
  will drift?

## Questions for Priyanka

1. Is "an LLM cannot paginate a document because it has no layout engine"
   a genuine reason for this MCP server to exist, or a rationalisation?
2. The MCP server is invisible in the UI. The submission is screenshots.
   How much of the agentic claim survives that?
3. Does the MCP server share the pagination code with the browser app, or
   is it a second implementation that will diverge? How would you check?
4. Which is the better tool surface: `waste_report(doc)` returning
   structured per-page coverage, or `proof(doc)` returning a rendered
   verdict? What would you actually want to call?
5. Be honest — if you saw this on GitHub, would you install the MCP server,
   or would you look at the screenshots and move on?
6. What would make this the reference example people cite for "MCP server
   that does something a model can't"?
