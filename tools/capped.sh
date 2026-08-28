#!/bin/bash
# 在 CPU 配额内跑给定命令，避免多个 agent 并发时把本机压到没法用。
#
#   bash tools/capped.sh npm test
#   bash tools/capped.sh node tools/mutation-check.mjs --jobs 4
#   ERA_CPU_QUOTA=200% bash tools/capped.sh npm test    # 想更客气一点
#
# 为什么需要它：本机 16 核，测试套件默认按核数并发（node --test 起到 26 个
# 进程），三个 agent 同时跑就把 load 顶到 20，**交互延迟从 32ms 涨到 698ms**
# ——机器还在算，但人已经没法用了。限到每份 4 核之后延迟回到 106ms，总耗时
# 只多 5%（43s → 45s，三并发实测）。
#
# 只限 CPU，不限内存：CPU 配额超了是变慢，MemoryMax 超了是 OOM kill，
# 而被 kill 的测试进程表现为「测试失败」——用假红换机器响应不划算。
#
# systemd 不可用时（CI runner、没开 systemd 的 WSL）直接透传执行，不报错也
# 不静默改行为：CI 上 runner 独占机器，本来就不需要限流。

set -euo pipefail

QUOTA="${ERA_CPU_QUOTA:-400%}"

if [ $# -eq 0 ]; then
  echo "用法: bash tools/capped.sh <命令...>" >&2
  exit 2
fi

# --user --scope 把命令放进一个临时 cgroup；--quiet 去掉 systemd 的横幅。
# 探测用 true 实跑一次：光看 systemd-run 在不在 PATH 上不够，容器里常常
# 有这个可执行文件但连不上 user session。
if command -v systemd-run >/dev/null 2>&1 &&
  systemd-run --user --scope --quiet -p CPUQuota=100% true >/dev/null 2>&1; then
  exec systemd-run --user --scope --quiet -p "CPUQuota=$QUOTA" "$@"
fi

echo "[capped] systemd user scope 不可用，直接执行（未限流）" >&2
exec "$@"
