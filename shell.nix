let
  pkgs = import <nixpkgs> { };
in
  pkgs.mkShell {
    nativeBuildInputs = with pkgs; [
      stdenv.cc.cc.lib # make bcrypt js happy
      bun
    ];
    LD_LIBRARY_PATH = "$LD_LIBRARY_PATH:${pkgs.stdenv.cc.cc.lib}/lib"; # makes bcrypt js happy
  }