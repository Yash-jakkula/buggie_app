{routeCoordinates && (
    <>
      
      {/* Render route on the map */}
      <ShapeSource id="routeSource" shape={{ type: 'LineString', coordinates: routeCoordinates }}>
          <LineLayer id="routeLayer" style={{ lineColor: '#FF0000', lineWidth: 3 }} />
        </ShapeSource>
  
        {/* Render markers for each point */}
        
        {routeCoordinates.map((coordinate,index) => (
          (index >0 && index%2!=0) ?
          (
          <PointAnnotation key={index} id={`point-${index}`} coordinate={coordinate}>
             <View style={{width: 20, height: 20, backgroundColor: 'blue', borderRadius: 15}} />
          </PointAnnotation> 
          ):
          (
          <PointAnnotation key={index} id={`point-${index}`} coordinate={coordinate} />
          )
        ))}
     
    </>
        )
      }
  
  {/* <UserLocation 
  androidRenderMode='gps'
  onUpdate={(location)=>{
    if(location.coords.latitude > -90 && location.coords.longitude < 90)
    setDriverLocation([location.coords.longitude,location.coords.latitude])
  }}
  /> */}
  
  