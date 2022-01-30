export function mapCameraData(cameras, zones, status){
    const mappedArray = cameras.map(camera => {
        const zone = zones.find(zone => zone.zoneId == camera.zoneId);
        const currentStatus = status.find(({cameraId}) => cameraId == camera.cameraId);
        return {
            ...camera,
            ...zone,
            zone:zone.name,
            name:camera.name,
            ...currentStatus
        }
    });

    return mappedArray;
}