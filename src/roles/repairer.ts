const repairer = (creep: Creep): void => {
  const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: object => object.hits !== object.hitsMax
  });
  if (!creep.memory.working && creep.store.energy === creep.store.getCapacity()) {
    creep.memory.working = true;
  }
  if (creep.memory.working && creep.store.energy === 0) {
    creep.memory.working = false;
  }
  if (!creep.memory.working && structure) {
    if (creep.withdraw(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(structure, {
        visualizePathStyle: {
          stroke: "#FFFFFF"
        }
      });
    }
    return;
  }
  if (creep.memory.working && structure) {
    if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
      creep.moveTo(structure, {
        visualizePathStyle: {
          stroke: "#FFFFFF"
        }
      });
    }
    return;
  }
};

export default repairer;
