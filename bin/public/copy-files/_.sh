
# === {{CMD}}           from/dir   to/dir
# === {{CMD}}  PATTERN  from/dir   to/dir
# ===
# === Default PATTERN used in `find`:  .+?\.(css|js|png|gif|jpg)$
copy-files () {

  local +x PATTERN='.+?\.(css|js|png|gif|jpg)$';
  if [[ ! -d "$1" ]] ; then
    PATTERN="$1"; shift
  fi

  local +x FROM="$(realpath "$1")"; shift
  local +x TO="$(realpath "$1")"; shift

  mkdir -p "$TO"
  local +x IFS=$'\n'

  local +x FILES="$(find "$FROM" -type f -regextype posix-extended  -regex $PATTERN -print)"

  if [[ -z "$FILES" ]]; then
    sh_color ORANGE "=== {{No files}} to copy: $FROM -> $TO" >&2
    return 0
  fi

  cd "$FROM"
  cp --parents -i          \
    ${FILES//"$FROM/"/}     \
    "$TO"
} # === end function

