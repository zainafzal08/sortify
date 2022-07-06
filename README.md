# P1

- [ ] Implement finish state.
- [ ] Actually commit edits to spotify.
- [ ] Fix weird scroll when dragging card to bottom / right.
- [ ] Handle empty playlists.

# P2

- [ ] If you swipe too fast you get `Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22`
- [ ] Move all remaining todo items to github issues.
- [ ] Add settings dialog
  - [ ] Allow user to adjust volume.
  - [ ] Link to github so user can file bugs.
  - [ ] Allow user to perma turn off playback?
  - [ ] Allow user to restart.
- [ ] Once you get to sort view you can't swipe down to get url bar because card
      container captures all pointer events lmao.
- [ ] Test on firefox and safari.
- [ ] Refactor code cause it's disgusting lmao.
  - [ ] Split into multiple components
  - [ ] Lean on lit more instead of doing out of cycle dom manip.
- [ ] Apply for quota upgrade with spotify.
- [ ] Allow for songs to be removed from their original playlist.

# Needs verification

- [ ] Make sure app can now handle using refresh tokens.

# Done

- [x] Actually implement swiping UI.
- [x] Implement album colors.
- [x] Implement song playback.
- [x] Have default audio volume be 50%.
- [x] Smoothen commit card transition, atm background + card flashes.
- [x] Show playback UI to highlight when there is no audio clip available and
      to let the user pause/play the current track.
- [x] Implement playlist names UI.
- [x] Filter sink playlists to only be ones with write permissions (not discover
      weekly)
- [x] Optimise UI for mobile.
  - [x] Fix scrolling into white.
  - [x] Swipe doesn't work at all.
  - [x] Playlist UI doesn't have enough room on mobile.
- [x] Make scrolling playlist regions have fade in / out.
- [x] Trigger auto scroll regions on resize
- [x] Allow users to read from liked songs.
- [x] Remove ability to resume a queue, force user to re-setup every time.
- [x] Add license.
- [x] Handle limits correctly. playlist fetch is likely to only get the first
      50 songs in a playlist.
