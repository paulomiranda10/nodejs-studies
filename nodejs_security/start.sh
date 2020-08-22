#! /home/paulo/bootcamp2019/gobarber
# ========================
# Script: start.sh
# ========================
clear
echo ""
echo ">>>>>>>>>> Listando processos do docker <<<<<<<<<<"
echo ""
docker ps
echo ""
echo "Iniciando processos do docker"
echo ""
docker start database
echo ""
docker start mongobarber
echo ""
docker start redisbarber
echo ""
docker ps
echo ">>>>>>>>>> TODOS OS PROCESSOS do docker FORAM INICIALIZADOS <<<<<<<<<<"
# echo "Iniciando fila de email"
# yarn queue
echo "Iniciando servidor back-end NodeJS"
yarn dev

