# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Type

This is a [Rojo](https://rojo.space/) project for Roblox game development. `default.project.json` is the Rojo project file that maps filesystem paths to the Roblox DataModel hierarchy. There is currently no source code — the `src/` directories referenced by the project file do not yet exist and must be created before syncing.

## Source → DataModel Mapping

Defined in `default.project.json`:

- `src/shared/` → `ReplicatedStorage.Shared` (code replicated to both server and clients)
- `src/server/` → `ServerScriptService.Server` (server-only scripts)
- `src/client/` → `StarterPlayer.StarterPlayerScripts.Client` (client-only scripts, cloned into each player)

When adding new code, place it in the directory that matches its execution context. Shared modules that both server and client need go in `src/shared/`.

## Common Commands

Rojo must be installed (via [Aftman](https://github.com/LPGhatguy/aftman), [Foreman](https://github.com/Roblox/foreman), or `cargo install rojo`). This repo does not yet pin a Rojo version.

- `rojo serve` — start the Rojo live-sync server so Roblox Studio (with the Rojo plugin) can two-way sync with the filesystem.
- `rojo build -o build.rbxlx` — build a standalone place file from the project.
- `rojo sourcemap default.project.json -o sourcemap.json` — generate a sourcemap (required for tools like selene, luau-lsp, StyLua path-aware configs).

## Workspace Notes

- `Workspace.FilteringEnabled = true` and `SoundService.RespectFilteringEnabled = true` — all gameplay code must assume server-authoritative filtering. Never rely on client-to-client replication; route through the server via RemoteEvents/RemoteFunctions in `src/shared/`.
- A single anchored `Baseplate` part is defined in the project file; the rest of the world is expected to be built in code or added to the project tree.
