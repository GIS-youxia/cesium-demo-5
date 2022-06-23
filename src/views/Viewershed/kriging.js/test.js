var kriging = require('./kriging');

function generateTestData(n){
    var x = [];
    var y = [];
    var t = [];

    // create a fake dataset where t is 100 when lat is east
    for (var i = 0; i < n; i++){
        x[i] = (-180)+Math.random()*360;
        y[i] = (-90)+Math.random()*180;
        t[i] = (x[i] > 0) ? 100 : 0;
    }
    return [t,x,y];
}

describe('kriging', function(){
    this.timeout(50 * 1000);

    it('makes a basic prediction', function(done){

        var data = generateTestData(100);
        var variogram = kriging.train(data[0],data[1],data[2],"exponential", 0, 10);

        if (!variogram) return done("variogram is null");

        if (kriging.predict(180, 0, variogram) < 50) done("unexpected result (<50)");
        if (kriging.predict(-180, 0, variogram) > 50) done("unexpected result (>50)");

        done();
    });

    it('handles 1000 points', function(done){

        var data = generateTestData(1000);
        var variogram = kriging.train(data[0],data[1],data[2],"exponential", 0, 10);

        if (!variogram) return done("variogram is null");

        if (kriging.predict(180, 0, variogram) < 50) done("unexpected result (<50)");
        if (kriging.predict(-180, 0, variogram) > 50) done("unexpected result (>50)");

        done();
    });
});