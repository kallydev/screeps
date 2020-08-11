import { ErrorMapper } from "utils/ErrorMapper";
import builder from "./roles/builder";
import harvester from "./roles/harvester";
import repairer from "./roles/repairer";
import upgrader from "./roles/upgrader";

export const loop = ErrorMapper.wrapLoop(() => {
  for (const roomName in Game.rooms) {
    const creeps = _.filter(Game.creeps, (creep: Creep) => creep.memory.room === roomName);
    // Count the number of creeps of all Role types
    const harvesterNumber = _.sum(creeps, (creep: Creep) => (creep.memory.role === "harvester" ? 1 : 0));
    const upgraderNumber = _.sum(creeps, (creep: Creep) => (creep.memory.role === "upgrader" ? 1 : 0));
    const buidlerNumber = _.sum(creeps, (creep: Creep) => (creep.memory.role === "builder" ? 1 : 0));
    const repairerNumber = _.sum(creeps, (creep: Creep) => (creep.memory.role === "repairer" ? 1 : 0));
    // Each room maintains a certain amount of creep
    if (harvesterNumber < 10) {
      for (const spawnName in Game.spawns) {
        const spawn = Game.spawns[spawnName];
        spawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], `harvester_${Game.time}`, {
          memory: {
            room: roomName,
            role: "harvester",
            working: false
          }
        });
      }
    } else if (upgraderNumber < 10) {
      for (const spawnName in Game.spawns) {
        const spawn = Game.spawns[spawnName];
        spawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], `upgrader_${Game.time}`, {
          memory: {
            room: roomName,
            role: "upgrader",
            working: false
          }
        });
      }
    } else if (buidlerNumber < 5) {
      for (const spawnName in Game.spawns) {
        const spawn = Game.spawns[spawnName];
        spawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], `builder_${Game.time}`, {
          memory: {
            room: roomName,
            role: "builder",
            working: false
          }
        });
      }
    } else if (repairerNumber < 3) {
      for (const spawnName in Game.spawns) {
        const spawn = Game.spawns[spawnName];
        //
        spawn.spawnCreep([WORK, CARRY, MOVE], `repairer_${Game.time}`, {
          memory: {
            room: roomName,
            role: "repairer",
            working: false
          }
        });
      }
    }
    // Handle the actions of Creep of different roles
    for (const creep of creeps) {
      switch (creep.memory.role) {
        case "harvester":
          harvester(creep);
          break;
        case "upgrader":
          if (harvesterNumber < 10) {
            harvester(creep);
          } else {
            upgrader(creep);
          }
          break;
        case "builder":
          if (harvesterNumber < 10) {
            harvester(creep);
          } else {
            builder(creep);
          }
          break;
        case "repairer":
          if (harvesterNumber < 10) {
            harvester(creep);
          } else {
            repairer(creep);
          }
          break;
      }
    }
  }
});
