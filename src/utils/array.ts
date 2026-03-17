export const chunkIntoRows = <T>(arr: T[], size: number): T[][] =>
  arr.reduce<T[][]>((acc, item, i) => {
    const rowIndex = Math.floor(i / size);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(item);
    return acc;
  }, []);

export default chunkIntoRows;
