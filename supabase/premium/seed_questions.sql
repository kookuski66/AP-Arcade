-- Additional free MCQs: 15 items for every AP Arcade course unit.
-- Run after all migrations. Re-running skips this seed tag.
-- Each compact question tuple is [prompt, answer choices, correct answer index, explanation].
with seed(course, content_key, content_type, content) as (
  values
    ('AP Physics 1', 'Unit 1 Kinematics', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A cart moves from x=-3 m to x=9 m in 4 s. What is its average velocity?",["2 m/s","3 m/s","4 m/s","6 m/s"],1,"Average velocity is displacement divided by time: 12/4=3 m/s."],
        ["An object has v0=2 m/s and constant acceleration -1 m/s^2. What is its velocity after 3 s?",["-1 m/s","0 m/s","1 m/s","5 m/s"],0,"v=v0+at=2-3=-1 m/s."],
        ["A particle has x(t)=4+2t+3t^2 in meters. What is its instantaneous velocity at t=2 s?",["8 m/s","10 m/s","14 m/s","20 m/s"],2,"Differentiate x(t): v=2+6t, so v(2)=14 m/s."],
        ["A velocity-time graph rises linearly from 0 to 8 m/s over 4 s. What displacement occurs?",["8 m","12 m","16 m","32 m"],2,"Displacement is the triangular area: one-half times 4 times 8."],
        ["A runner completes one lap of a 200 m track and stops at the start. Which average is zero for the lap?",["Average speed only","Average velocity only","Both averages","Neither average"],1,"Net displacement is zero, while the traveled distance is not."],
        ["A car travels east at 12 m/s while acceleration is 3 m/s^2 west. What happens to its speed initially?",["It increases","It decreases","It stays constant","It instantly becomes zero"],1,"Acceleration opposite velocity reduces speed."],
        ["An object is dropped from rest. Ignoring drag, how far does it fall in 2 s? Use g=10 m/s^2.",["10 m","20 m","40 m","80 m"],1,"Delta y=one-half gt^2=one-half times 10 times 4=20 m."],
        ["A position-time graph has a constant negative slope. The object's velocity is",["Zero","Constant and negative","Increasing and positive","Constant and positive"],1,"The slope of position versus time is velocity."],
        ["A ball is thrown upward. At its highest point, which is true?",["Velocity and acceleration are zero","Velocity is zero; acceleration is downward","Velocity is upward; acceleration is zero","Both point downward"],1,"Only velocity is momentarily zero; gravity still acts."],
        ["A cyclist moves 30 m north, then 40 m south. What is the magnitude of displacement?",["10 m","35 m","40 m","70 m"],0,"The net displacement is 10 m south."],
        ["A car's velocity changes from 5 m/s to 17 m/s in 4 s. Its average acceleration is",["2 m/s^2","3 m/s^2","4 m/s^2","5.5 m/s^2"],1,"Acceleration is change in velocity over time: 12/4=3 m/s^2."],
        ["For x(t)=t^2-6t, when is instantaneous velocity zero?",["t=0 s","t=2 s","t=3 s","t=6 s"],2,"v=2t-6, which is zero at t=3 s."],
        ["A velocity-time graph stays at -4 m/s for 3 s. What is the displacement?",["-12 m","-7 m","7 m","12 m"],0,"Constant velocity times elapsed time gives -4 times 3=-12 m."],
        ["Two objects are dropped simultaneously in a vacuum from the same height. Which lands first?",["The heavier object","The lighter object","They land together","It depends on their shapes"],2,"Both have the same gravitational acceleration in a vacuum."],
        ["A car travels 60 m in 5 s, then 40 m in 5 s in the same direction. What is its average speed?",["8 m/s","10 m/s","12 m/s","20 m/s"],1,"Total distance divided by total time is 100/10=10 m/s."]
      ]}
    $$::jsonb),
    ('AP Physics 1', 'Unit 2 Force and Translational Dynamics', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A 4 kg cart experiences a net force of 18 N east. What is its acceleration?",["2.5 m/s^2 east","4.5 m/s^2 east","14 m/s^2 east","72 m/s^2 east"],1,"Newton's second law gives a=F/m=18/4=4.5 m/s^2."],
        ["A 6 kg box is pulled right by 30 N while friction is 12 N left. What is its acceleration?",["2 m/s^2 right","3 m/s^2 right","5 m/s^2 right","7 m/s^2 left"],1,"The net force is 18 N right, so a=18/6=3 m/s^2."],
        ["A book rests on a table. The book's weight and the table's normal force",["Are a third-law pair","Act on different objects","Balance on the book but are not a third-law pair","Must have different magnitudes"],2,"Both act on the book; third-law partners act on separate objects."],
        ["A block remains at rest under a horizontal 9 N push. Static friction has magnitude",["0 N","9 N opposite the push","Greater than 9 N","9 N in the push direction"],1,"At rest, static friction balances the applied force."],
        ["A 2 kg object and a 5 kg object experience the same net force. The 2 kg object's acceleration is",["2.5 times larger","2.5 times smaller","Equal","7 times larger"],0,"For the same force, acceleration is inversely proportional to mass."],
        ["A 10 kg elevator accelerates upward at 1 m/s^2. Use g=10 m/s^2. What is the floor's normal force?",["90 N","100 N","110 N","200 N"],2,"N-mg=ma, so N=10(10+1)=110 N."],
        ["A box moves at constant velocity across a level floor while pulled horizontally. The pull equals",["Its weight","The kinetic friction magnitude","Zero","Its normal force"],1,"Constant velocity means zero net horizontal force."],
        ["A 3 kg object has forces 20 N east and 8 N west. What is its acceleration?",["4 m/s^2 east","6.7 m/s^2 east","9.3 m/s^2 west","12 m/s^2 east"],0,"Net force is 12 N east; 12/3=4 m/s^2."],
        ["A passenger leans forward when a bus stops because the passenger's body tends to",["Move toward the rear","Continue its forward motion","Lose its mass","Experience a new forward force"],1,"Inertia resists a change in the passenger's motion."],
        ["A 5 kg crate is lifted upward at constant speed. What is the lifting force? Use g=10 m/s^2.",["5 N","25 N","50 N","100 N"],2,"Zero acceleration requires the lifting force to balance the 50 N weight."],
        ["A falling object reaches terminal velocity. At that instant",["Drag is zero","Drag equals weight in magnitude","Net force is its weight downward","Acceleration equals g"],1,"Terminal velocity means zero net force and zero acceleration."],
        ["A 2 kg block slides on a horizontal surface with kinetic friction 6 N. What applied horizontal force keeps it at constant velocity?",["0 N","3 N","6 N","12 N"],2,"The applied force must balance friction."],
        ["Two skaters push apart. The force on skater A by B compared with the force on B by A is",["Larger","Smaller","Equal in magnitude and opposite","Zero if their masses differ"],2,"Newton's third law pairs are equal and opposite."],
        ["An elevator accelerates downward at g. What is the normal force on a passenger of mass m?",["0","mg","2mg","mg/2"],0,"With downward acceleration g, gravity alone provides the net force, so the floor's normal force is zero."],
        ["On a frictionless incline at angle theta, the component of weight parallel to the ramp is",["mg cos(theta)","mg sin(theta)","mg tan(theta)","Zero"],1,"Resolving gravity along the ramp gives mg sin(theta)."]
      ]}
    $$::jsonb),
    ('AP Physics 1', 'Unit 4 Energy', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A 15 N force moves a box 4 m in the force direction. How much work is done?",["3.75 J","19 J","60 J","120 J"],2,"W=Fd=15 times 4=60 J."],
        ["A 3 kg cart moves at 4 m/s. What is its kinetic energy?",["12 J","18 J","24 J","48 J"],2,"K=one-half mv^2=one-half times 3 times 16=24 J."],
        ["A 2 kg object is lifted 5 m. Use g=10 m/s^2. What is its gravitational potential energy gain?",["10 J","25 J","100 J","250 J"],2,"Delta Ug=mgh=2 times 10 times 5=100 J."],
        ["A force acts perpendicular to an object's displacement. The work done by that force is",["Positive","Negative","Zero","Equal to force times distance"],2,"W=Fd cos(90 degrees)=0."],
        ["A spring with k=100 N/m is compressed 0.20 m. How much elastic energy is stored?",["1 J","2 J","10 J","20 J"],1,"Us=one-half kx^2=one-half times 100 times 0.04=2 J."],
        ["A motor transfers 900 J in 3 s. What is its average power?",["30 W","300 W","900 W","2700 W"],1,"Power is energy divided by time: 900/3=300 W."],
        ["A 2 kg cart speeds up from 2 m/s to 6 m/s. What is the net work on it?",["16 J","24 J","32 J","40 J"],2,"Net work equals delta K: one-half times 2 times (36-4)=32 J."],
        ["A ball falls without air resistance. As it falls, its gravitational potential energy",["Increases","Decreases while kinetic energy increases","And kinetic energy both decrease","Stays constant"],1,"Mechanical energy is converted from gravitational potential to kinetic."],
        ["A 5 N force acts over 6 m at 60 degrees to displacement. What work does it do?",["0 J","15 J","30 J","60 J"],1,"W=Fd cos(60 degrees)=5 times 6 times one-half=15 J."],
        ["A 4 kg object moving at 3 m/s is brought to rest. What is the net work?",["-18 J","-12 J","12 J","18 J"],0,"Delta K=0-one-half times 4 times 9=-18 J."],
        ["A force-position graph is constant at 8 N from x=0 to x=2 m. Work is",["4 J","10 J","16 J","32 J"],2,"Work is area under the graph: 8 times 2=16 J."],
        ["A 60 W lamp runs for 2 minutes. How much energy does it use?",["120 J","720 J","7200 J","12000 J"],2,"Energy=Pt=60 times 120=7200 J."],
        ["A crate slides at constant speed while friction acts. The work by friction is",["Positive","Negative","Zero","Equal to total work"],1,"Friction opposes displacement, so its work is negative."],
        ["Two identical objects are lifted to heights h and 4h. Their gravitational potential energies compare as",["1:2","1:4","1:8","4:1"],1,"Ug=mgh, so energy scales directly with height."],
        ["An ideal roller coaster starts from rest at height 20 m. At height 5 m, what is its speed? Use g=10 m/s^2.",["10 m/s","10sqrt(3) m/s","20 m/s","25 m/s"],1,"Energy gives v^2=2g(20-5)=300, so v=10sqrt(3) m/s."]
      ]}
    $$::jsonb),
    ('AP Physics 1', 'Unit 5 Momentum', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A 3 kg cart moves at 4 m/s east. What is its momentum?",["0.75 kg m/s east","7 kg m/s east","12 kg m/s east","24 kg m/s east"],2,"Momentum p=mv=3 times 4=12 kg m/s east."],
        ["A 6 N force acts for 0.5 s. What impulse does it deliver?",["3 N s","6 N s","12 N s","0.083 N s"],0,"Impulse=F delta t=6 times 0.5=3 N s."],
        ["A 2 kg cart at 5 m/s sticks to a stationary 3 kg cart. Their final speed is",["1 m/s","2 m/s","3 m/s","5 m/s"],1,"Momentum conservation gives 10/(2+3)=2 m/s."],
        ["A ball rebounds from a wall at the same speed in the opposite direction. Its momentum change magnitude is",["0","mv","2mv","4mv"],2,"Reversal changes momentum from mv to -mv, a magnitude 2mv."],
        ["For a fixed momentum change, increasing collision time makes average force",["Larger","Smaller","Unchanged","Zero"],1,"F average=delta p/delta t."],
        ["An isolated system's total momentum during a collision is",["Always zero","Conserved","Conserved only if objects stick","Equal to total kinetic energy"],1,"Internal forces cannot change total system momentum."],
        ["A 1 kg cart at 6 m/s collides elastically with an identical stationary cart. Afterward, their speeds are",["Both 3 m/s","First stops; second moves at 6 m/s","Both 6 m/s","First reverses at 6 m/s"],1,"For equal masses in a one-dimensional elastic collision, velocities exchange."],
        ["A 0.2 kg ball changes velocity from 10 m/s east to 5 m/s west. What is the impulse magnitude?",["1 N s","2 N s","3 N s","5 N s"],2,"Delta p=0.2(-5-10)=-3 kg m/s; magnitude 3 N s."],
        ["Two carts push apart from rest on a low-friction track. Their momenta after separating are",["Equal and opposite","Equal and same direction","Both zero","Proportional to their speeds only"],0,"Initial total momentum is zero and remains zero."],
        ["A 4 kg cart has momentum 20 kg m/s. What is its speed?",["4 m/s","5 m/s","16 m/s","80 m/s"],1,"v=p/m=20/4=5 m/s."],
        ["A force-time graph is a rectangle 12 N high and 0.25 s wide. Its impulse is",["0.3 N s","3 N s","12 N s","48 N s"],1,"Impulse is the area: 12 times 0.25=3 N s."],
        ["A 2 kg cart moving at 4 m/s catches a 2 kg cart moving at 1 m/s in the same direction; they stick. Final speed is",["1.5 m/s","2.5 m/s","3 m/s","5 m/s"],1,"Total momentum 10 is divided by total mass 4, giving 2.5 m/s."],
        ["A stationary object explodes into two pieces in an isolated system. The pieces' total momentum is",["Zero","Positive","Negative","Equal to released energy"],0,"Momentum before and after is conserved; initial momentum was zero."],
        ["A 0.5 kg object has momentum 6 kg m/s. What is its kinetic energy?",["18 J","24 J","36 J","72 J"],2,"K=p^2/(2m)=36/1=36 J."],
        ["Which collision definitely conserves total kinetic energy as well as momentum?",["Perfectly inelastic","Elastic","Any collision with equal masses","Any collision at rest"],1,"Elastic collisions conserve both quantities for the system."]
      ]}
    $$::jsonb),
    ('AP Physics 1', 'Unit 5 Torque and Rotational Dynamics', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A 10 N force acts perpendicular 0.4 m from a pivot. What is the torque magnitude?",["0.04 N m","2.5 N m","4 N m","10.4 N m"],2,"Tau=rF sin(theta)=0.4 times 10=4 N m."],
        ["A force's line of action passes through the rotation axis. Its torque about that axis is",["Zero","Maximum","F times radius","Depends only on mass"],0,"The perpendicular lever arm is zero."],
        ["A solid disk of mass M and radius R has central-axis rotational inertia",["MR^2","One-half MR^2","Two-thirds MR^2","2MR^2"],1,"The standard result for a solid disk is I=one-half MR^2."],
        ["A net torque of 9 N m acts on an object with I=3 kg m^2. Its angular acceleration is",["0.33 rad/s^2","3 rad/s^2","6 rad/s^2","27 rad/s^2"],1,"Tau=I alpha, so alpha=9/3=3 rad/s^2."],
        ["A wheel's angular speed changes from 2 to 14 rad/s in 4 s. Its angular acceleration is",["2 rad/s^2","3 rad/s^2","4 rad/s^2","16 rad/s^2"],1,"Alpha=delta omega/delta t=12/4=3 rad/s^2."],
        ["At fixed angular speed, doubling distance from the axis doubles a point's",["Angular acceleration","Tangential speed","Period","Angular displacement"],1,"Tangential speed v=omega r."],
        ["A wheel turns through 12 rad at constant 4 rad/s. Elapsed time is",["0.33 s","3 s","8 s","48 s"],1,"Time=angular displacement/angular speed=12/4=3 s."],
        ["Two equal opposite forces applied at different points can produce",["Zero net force and nonzero torque","Nonzero net force and zero torque","Zero torque only","No rotational effect"],0,"A force couple has zero net force but may have nonzero torque."],
        ["A wheel starts from rest with alpha=5 rad/s^2 for 2 s. Its final angular speed is",["2.5 rad/s","5 rad/s","10 rad/s","20 rad/s"],2,"Omega=omega0+alpha t=10 rad/s."],
        ["For the same net torque, increasing rotational inertia makes angular acceleration",["Increase","Decrease","Stay fixed","Reverse sign"],1,"Alpha=tau/I."],
        ["A 20 N force acts 0.5 m from a pivot at 30 degrees to the radius. Torque magnitude is",["2.5 N m","5 N m","10 N m","17.3 N m"],1,"Tau=rF sin30=0.5 times 20 times 0.5=5 N m."],
        ["A door is easiest to rotate by pushing",["At the hinge toward the door","Far from the hinge perpendicular to the door","Far from the hinge parallel to the door","At the hinge perpendicular to the door"],1,"A long lever arm and perpendicular force maximize torque."],
        ["An object rotates with constant angular velocity. Its angular acceleration is",["Positive","Negative","Zero","Equal to its angular velocity"],2,"Angular acceleration is the rate of change of angular velocity."],
        ["A point mass 2 kg is 3 m from an axis. Its rotational inertia is",["6 kg m^2","9 kg m^2","18 kg m^2","36 kg m^2"],2,"I=mr^2=2 times 9=18 kg m^2."],
        ["A wrench is 0.25 m long. A perpendicular 40 N force produces torque",["10 N m","16 N m","40 N m","160 N m"],0,"Tau=rF=0.25 times 40=10 N m."]
      ]}
    $$::jsonb),
    ('AP Physics 1', 'Unit 6 Energy and Momentum of Rotating Systems', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A rotor with I=0.8 kg m^2 spins at 5 rad/s. Its rotational kinetic energy is",["4 J","10 J","20 J","40 J"],1,"Krot=one-half I omega^2=0.4 times 25=10 J."],
        ["A wheel of radius 0.4 m rolls without slipping at 2 m/s. Its angular speed is",["0.8 rad/s","2.4 rad/s","5 rad/s","8 rad/s"],2,"Rolling constraint gives omega=v/R=2/0.4=5 rad/s."],
        ["A rolling object's total kinetic energy is",["One-half Mv^2 only","One-half I omega^2 only","One-half Mv^2 plus one-half I omega^2","Mv^2 plus I omega^2"],2,"Both translation of the center and rotation contribute."],
        ["A 6 N m torque turns a wheel through 3 rad. Work done is",["2 J","9 J","18 J","36 J"],2,"For constant torque, W=tau delta theta=18 J."],
        ["A system's angular momentum is conserved when its net external",["Force is zero","Torque is zero","Kinetic energy is zero","Rotational inertia is fixed"],1,"Zero external torque means angular momentum does not change."],
        ["A skater pulls her arms inward with negligible external torque. Her angular speed",["Decreases","Increases","Stays constant","Becomes zero"],1,"Her rotational inertia decreases, so conserved angular momentum requires omega to increase."],
        ["A point mass m moves perpendicular to radius r with speed v. Its angular momentum magnitude is",["mvr","mv/r","mr/v","mv^2r"],0,"For perpendicular motion, L=rmv."],
        ["A solid disk and a hoop with equal mass and radius roll from rest down the same ramp. Which typically reaches the bottom first?",["Hoop","Disk","They tie","The heavier one"],1,"The disk has smaller rotational inertia relative to MR^2."],
        ["A 1 kg mass moves at 3 m/s perpendicular to a pivot at radius 2 m. Its angular momentum magnitude is",["1.5 kg m^2/s","3 kg m^2/s","6 kg m^2/s","12 kg m^2/s"],2,"L=rmv=2 times 1 times 3=6 kg m^2/s."],
        ["Angular momentum changes by 15 kg m^2/s in 5 s. Average net torque is",["3 N m","5 N m","10 N m","75 N m"],0,"Average torque=delta L/delta t=15/5=3 N m."],
        ["If angular speed triples while rotational inertia stays fixed, rotational kinetic energy becomes",["Three times as large","Six times as large","Nine times as large","Unchanged"],2,"Krot is proportional to omega squared."],
        ["At the instant of pure rolling on a stationary surface, the contact point is",["Moving forward at 2v","Moving forward at v","Instantaneously at rest","Moving backward at v"],2,"Translational and rotational velocities cancel at the contact point."],
        ["A rotor's angular momentum stays constant while I doubles. Its angular speed",["Doubles","Halves","Quadruples","Stays the same"],1,"L=I omega, so omega halves when I doubles."],
        ["A torque does positive work on a rotating object. Its rotational kinetic energy",["Must decrease","Increases","Must remain fixed","Becomes negative"],1,"Positive net work increases rotational kinetic energy."],
        ["A rolling cylinder descends without slipping through vertical height h. Its lost gravitational potential energy becomes",["Only translational kinetic energy","Only rotational kinetic energy","Translational and rotational kinetic energy","Momentum"],2,"Energy is shared between center-of-mass motion and rotation."]
      ]}
    $$::jsonb),
    ('AP Physics 1', 'Unit 6 Simple Harmonic Motion', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["For ideal simple harmonic motion, acceleration is",["Constant and outward","Proportional to displacement and opposite it","Proportional to velocity","Zero except at equilibrium"],1,"The defining relation is a=-omega^2 x."],
        ["A spring oscillator has k=80 N/m and m=2 kg. Its angular frequency is",["4 rad/s","6.3 rad/s","40 rad/s","160 rad/s"],1,"Omega=sqrt(k/m)=sqrt(40), about 6.3 rad/s."],
        ["At equilibrium in ideal spring motion, the oscillator's",["Speed is maximum and acceleration is zero","Speed and acceleration are both maximum","Speed is zero","Potential energy is maximum"],0,"At x=0 the restoring force is zero, while kinetic energy peaks."],
        ["At maximum displacement in ideal SHM, velocity is",["Maximum","Zero","Equal to acceleration","Directed away from equilibrium"],1,"The oscillator momentarily turns around at an endpoint."],
        ["A mass-spring period is T. If the mass is multiplied by 9 with k fixed, the new period is",["T/3","T","3T","9T"],2,"T=2pi sqrt(m/k), so it triples."],
        ["For a small-angle pendulum, increasing string length makes the period",["Shorter","Longer","Unchanged","Zero"],1,"T=2pi sqrt(L/g)."],
        ["An oscillator has total mechanical energy 12 J and potential energy 5 J at one instant. Its kinetic energy is",["5 J","7 J","12 J","17 J"],1,"Total energy is K+U, so K=12-5=7 J."],
        ["Doubling the amplitude of an ideal spring oscillator while keeping m and k fixed changes its period",["Doubles it","Halves it","Leaves it unchanged","Quadruples it"],2,"The ideal period depends on mass and spring constant, not amplitude."],
        ["A pendulum is moved to a location with smaller gravitational acceleration. Its period",["Decreases","Increases","Stays fixed","Becomes zero"],1,"T is inversely proportional to sqrt(g)."],
        ["A spring is displaced x to the right. Its restoring force points",["Right with magnitude kx","Left with magnitude kx","Right with magnitude k/x","Zero"],1,"Hooke's law is F=-kx."],
        ["An oscillator has period 0.5 s. Its frequency is",["0.5 Hz","1 Hz","2 Hz","4 Hz"],2,"Frequency is 1/T=2 Hz."],
        ["In SHM, acceleration magnitude is greatest at",["Equilibrium","Maximum displacement","Every point equally","The point of maximum speed"],1,"Acceleration magnitude equals omega^2 times |x|."],
        ["A mass of 1 kg is attached to a spring with k=25 N/m. Its period is approximately",["0.4 s","1.26 s","2.5 s","6.28 s"],1,"T=2pi sqrt(1/25)=2pi/5 about 1.26 s."],
        ["If a spring constant increases by a factor of 4, the period for the same mass",["Doubles","Halves","Quadruples","Stays fixed"],1,"T is proportional to 1/sqrt(k)."],
        ["At a positive displacement from equilibrium, ideal SHM acceleration is",["Positive","Negative","Zero","Unrelated to displacement"],1,"Acceleration points opposite displacement."]
      ]}
    $$::jsonb),
    ('AP Physics 1', 'Unit 8 Fluids', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A submerged object displaces 0.03 m^3 of water. Use density=1000 kg/m^3 and g=10 m/s^2. Buoyant force is",["30 N","300 N","3000 N","30000 N"],1,"FB=rho V g=1000 times 0.03 times 10=300 N."],
        ["What is the gauge pressure 2 m below freshwater? Use rho=1000 kg/m^3 and g=10 m/s^2.",["2 kPa","20 kPa","200 kPa","2000 kPa"],1,"Gauge pressure rho g h=20,000 Pa=20 kPa."],
        ["A hydraulic press has output area 0.3 m^2 and input area 0.01 m^2. A 40 N input ideally produces",["120 N","400 N","1200 N","12000 N"],2,"Equal pressure gives output force 40 times 30=1200 N."],
        ["An incompressible liquid enters a pipe whose area is one-quarter as large. Its speed becomes",["One-quarter as large","One-half as large","Four times as large","Sixteen times as large"],2,"Continuity requires area times speed to stay constant."],
        ["An object floats with 30% of its volume submerged. Its density is",["0.3 times the fluid density","0.7 times the fluid density","Equal to the fluid density","3 times the fluid density"],0,"For floating equilibrium, density ratio equals submerged-volume fraction."],
        ["At the same depth in the same stationary liquid, pressure is",["Greater in the wider container","Greater in the narrower container","Equal","Dependent on container shape"],2,"Hydrostatic pressure depends on depth and density."],
        ["A 0.002 m^2 piston supports 100 N. Its gauge pressure is",["5 kPa","20 kPa","50 kPa","200 kPa"],2,"P=F/A=100/0.002=50,000 Pa."],
        ["Water exits a small opening 1.25 m below its surface. Ideal exit speed is approximately; use g=10 m/s^2.",["2.5 m/s","5 m/s","10 m/s","25 m/s"],1,"Torricelli's relation gives v=sqrt(2gh)=sqrt(25)=5 m/s."],
        ["A fully submerged object sinks if its average density is",["Less than the fluid density","Greater than the fluid density","Zero","Unrelated to the fluid density"],1,"Its weight then exceeds the buoyant force."],
        ["Absolute pressure at depth h in an open liquid is",["rho gh","Patm-rho gh","Patm+rho gh","Patm/rho gh"],2,"Atmospheric and hydrostatic pressures add."],
        ["In a horizontal ideal pipe, fluid speed increases in a narrow section. Static pressure there generally",["Increases","Decreases","Is unchanged","Must equal zero"],1,"Bernoulli's equation relates higher speed to lower static pressure."],
        ["A 3 L sample of water has mass approximately",["0.3 kg","3 kg","30 kg","300 kg"],1,"Water has density about 1 kg/L."],
        ["Two objects of equal volume are fully submerged in the same liquid. Their buoyant forces are",["Equal","Proportional to their masses","Greater for the deeper object","Zero"],0,"Each displaces the same volume of fluid."],
        ["A pipe radius is cut in half while steady incompressible flow is maintained. The fluid speed becomes",["Half as large","Twice as large","Four times as large","Eight times as large"],2,"Area falls by a factor of four, so speed rises fourfold."],
        ["A floating raft displaces 0.4 m^3 of water. Use rho=1000 kg/m^3 and g=10 m/s^2. Its supported weight is",["400 N","1000 N","4000 N","40000 N"],2,"Floating equilibrium supports rho V g=4000 N."]
      ]}
    $$::jsonb),
    ('AP Chemistry', 'Unit 1 Atomic Structure & Properties', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["An ion contains 17 protons, 18 neutrons, and 18 electrons. Its mass number and charge are",["35 and -1","35 and +1","36 and -1","17 and -1"],0,"Mass number is 17+18=35; one extra electron gives -1 charge."],
        ["Which isotope has the greatest number of neutrons?",["C-12","N-15","O-16","Ne-20"],3,"Ne-20 has 20-10=10 neutrons, the most listed."],
        ["An element has isotopes of masses 10 and 11 with abundances 20% and 80%. Its average atomic mass is",["10.2 amu","10.5 amu","10.8 amu","11.0 amu"],2,"Weighted mean is 0.20(10)+0.80(11)=10.8 amu."],
        ["Which electron configuration represents a ground-state Mg atom?",["1s2 2s2 2p6 3s2","1s2 2s2 2p5 3s3","1s2 2s2 2p6 3p2","1s2 2s2 2p6 3s1 3p1"],0,"Magnesium has 12 electrons; the first configuration fills the lowest orbitals."],
        ["Across a period from left to right, atomic radius generally",["Increases","Decreases","Stays constant","Alternates randomly"],1,"Increasing effective nuclear charge pulls electrons closer."],
        ["Which species is largest?",["Na+","Ne","F-","Mg2+"],2,"These are isoelectronic; F- has the fewest protons and weakest pull."],
        ["The first ionization energy of an atom is the energy required to",["Add an electron to a gaseous atom","Remove an electron from a gaseous atom","Remove a neutron from its nucleus","Break a chemical bond"],1,"Ionization energy measures electron removal from a gaseous atom."],
        ["Which element has the greatest first ionization energy?",["Na","Mg","Al","Si"],3,"Across period 3, ionization energy generally rises; Si is highest here."],
        ["An atom with 1s2 2s2 2p6 3s2 3p5 is in which periodic-table group?",["1","2","16","17"],3,"Seven valence electrons identify a halogen in group 17."],
        ["How many orbitals are in a p subshell?",["1","2","3","6"],2,"A p subshell has three orbitals."],
        ["What is the maximum number of electrons in one orbital?",["1","2","6","10"],1,"An orbital holds up to two electrons with opposite spins."],
        ["Which quantum number primarily identifies an electron shell?",["Principal quantum number n","Magnetic quantum number ml","Spin quantum number ms","Atomic number Z"],0,"The principal quantum number specifies the main energy level."],
        ["An atom forms a 2+ ion most directly by",["Gaining two protons","Losing two electrons","Gaining two electrons","Losing two neutrons"],1,"A 2+ charge results from losing two negatively charged electrons."],
        ["Which statement about isotopes of the same element is correct?",["They have different proton counts","They have equal neutron counts","They have equal proton counts and different neutron counts","They have different atomic numbers"],2,"Element identity is set by proton count; isotopes vary in neutrons."],
        ["Which atom has the greatest effective nuclear charge on its valence electrons among these period-2 elements?",["Li","C","N","F"],3,"Effective nuclear charge generally increases across a period."]
      ]}
    $$::jsonb),
    ('AP Chemistry', 'Unit 2 Molecular & Ionic Compound Structure', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["How many valence electrons are present in a neutral CO2 molecule?",["12","14","16","18"],2,"Carbon contributes 4 and two oxygens contribute 12, totaling 16."],
        ["In a typical Lewis structure, the central atom is usually",["Hydrogen","The least electronegative non-hydrogen atom","The most electronegative atom","Any halogen"],1,"The least electronegative atom commonly forms multiple surrounding bonds."],
        ["What is the molecular geometry of BF3?",["Trigonal planar","Trigonal pyramidal","Tetrahedral","Bent"],0,"Three bonding regions and no lone pairs give trigonal planar geometry."],
        ["What is the molecular geometry of NH3?",["Linear","Bent","Trigonal pyramidal","Trigonal planar"],2,"Three bonds and one lone pair give a trigonal-pyramidal shape."],
        ["The H-O-H bond angle is less than the ideal tetrahedral angle mainly because",["O-H bonds are ionic","Lone-pair repulsion compresses the bond angle","Hydrogen has lone pairs","Oxygen has no valence electrons"],1,"Lone pairs repel bonding pairs more strongly."],
        ["Which molecule is nonpolar despite having polar bonds?",["H2O","NH3","CO2","HCl"],2,"Linear CO2 has equal opposing bond dipoles that cancel."],
        ["What is the formal charge on nitrogen in NH4+?",["-1","0","+1","+2"],2,"Nitrogen has four bonds and no lone pair, giving formal charge +1."],
        ["A sigma bond is formed by",["Side-on overlap of p orbitals","End-to-end orbital overlap along the internuclear axis","Transfer of a proton","Attraction between ions only"],1,"Sigma bonding uses overlap along the internuclear axis."],
        ["A double bond contains",["Two sigma bonds","One sigma and one pi bond","Two pi bonds","One ionic and one sigma bond"],1,"A double bond has one sigma and one pi component."],
        ["Which pair is most likely to form an ionic compound?",["C and O","N and O","K and Br","S and Cl"],2,"A metal and nonmetal with a large electronegativity difference commonly form ions."],
        ["The lattice energy magnitude of an ionic solid tends to increase when ion charges",["Decrease","Increase","Become equal to zero","Have no effect"],1,"Coulombic attraction strengthens with larger ionic charges."],
        ["Resonance structures differ in the placement of",["Atomic nuclei","Electrons, while atom connectivity remains the same","Protons","The molecular formula"],1,"Resonance redistributes electrons without moving nuclei."],
        ["Which species has a linear molecular geometry?",["H2O","SO2","BeCl2","NH3"],2,"BeCl2 has two electron regions around Be and no lone pairs."],
        ["A polar covalent bond is most likely when bonded atoms have",["Identical electronegativities","A moderate electronegativity difference","No valence electrons","The same number of neutrons"],1,"Unequal sharing from a moderate electronegativity difference creates polarity."],
        ["What is the approximate hybridization of carbon in CH4?",["sp","sp2","sp3","dsp3"],2,"Four electron domains correspond to tetrahedral sp3 hybridization."]
      ]}
    $$::jsonb),
    ('AP Chemistry', 'Unit 3 Intermolecular Forces & Properties', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["Which intermolecular attraction is present between all molecules?",["Hydrogen bonding","Ion-dipole attraction","London dispersion","Permanent dipole-dipole only"],2,"London dispersion forces occur in all atoms and molecules."],
        ["Hydrogen bonding between molecules generally requires H bonded directly to",["C, Si, or P","N, O, or F","Na, K, or Li","Any halogen"],1,"Strong hydrogen bonding commonly occurs with N-H, O-H, or F-H bonds."],
        ["Which substance is expected to have the highest boiling point?",["CH4","NH3","H2O","H2S"],2,"Water forms an extensive hydrogen-bond network."],
        ["For similarly shaped nonpolar molecules, stronger dispersion forces are associated with",["Fewer electrons","Greater polarizability","Lower molar mass","Smaller electron clouds"],1,"Larger, more polarizable electron clouds produce stronger dispersion."],
        ["A liquid with strong intermolecular attractions tends to have",["High vapor pressure","Low boiling point","High surface tension","Low viscosity in every case"],2,"Stronger attractions resist surface expansion and raise surface tension."],
        ["At the same temperature, a liquid with higher vapor pressure generally has",["Stronger intermolecular forces","Weaker intermolecular forces","Higher surface tension","A higher normal boiling point"],1,"More molecules escape when attractions are weaker."],
        ["A liquid boils when its vapor pressure equals",["Zero","The external pressure","Its density","Its surface tension"],1,"Boiling occurs when vapor pressure matches external pressure."],
        ["Which sample has the greatest average kinetic energy of its particles?",["Liquid water at 20 C","Liquid water at 60 C","Ice at 0 C","Water vapor at 40 C"],1,"Average kinetic energy tracks temperature; 60 C is highest."],
        ["A substance with a high specific heat requires",["Little energy for a large temperature change","More energy per gram per degree of warming","No energy to change temperature","Energy only during phase changes"],1,"Specific heat is energy required per unit mass per degree."],
        ["When an ideal gas is compressed at constant temperature, its pressure",["Decreases","Increases","Stays constant","Becomes zero"],1,"Boyle's law gives pressure inversely proportional to volume."],
        ["At constant pressure, a gas sample heated from 300 K to 600 K doubles its volume. This follows",["Boyle's law","Charles's law","Dalton's law","Henry's law"],1,"Charles's law relates volume directly to absolute temperature."],
        ["A solution is unsaturated when it",["Contains more solute than can dissolve","Can dissolve additional solute at that condition","Must contain a precipitate","Has equal solute and solvent masses"],1,"An unsaturated solution is below its solubility limit."],
        ["Increasing temperature usually increases the solubility of which solute in water?",["Most gases","Many solid ionic compounds","All gases","No solids"],1,"Many solid solutes become more soluble as temperature rises."],
        ["A polar molecular solute is generally most soluble in",["A nonpolar solvent","A polar solvent","A metal","A vacuum"],1,"Similar intermolecular interactions favor mixing."],
        ["At equal temperature and pressure, which gas has the greatest average molecular speed?",["H2","N2","O2","CO2"],0,"At the same temperature, lighter gas particles move faster on average."]
      ]}
    $$::jsonb),
    ('AP Chemistry', 'Unit 4 Chemical Reactions', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["How many moles are in 18.0 g of H2O? Use molar mass 18.0 g/mol.",["0.50 mol","1.00 mol","2.00 mol","18.0 mol"],1,"Moles=mass/molar mass=18.0/18.0=1.00 mol."],
        ["For 2H2+O2->2H2O, how many moles of water form from 3 mol H2 with excess O2?",["1.5 mol","2 mol","3 mol","6 mol"],2,"The mole ratio H2:H2O is 2:2, so 3 mol H2 makes 3 mol H2O."],
        ["For N2+3H2->2NH3, starting with 2 mol N2 and 3 mol H2, the limiting reactant is",["N2","H2","NH3","Neither"],1,"Three moles H2 require only one mole N2, so H2 limits."],
        ["How many grams are in 0.50 mol NaCl? Use 58.5 g/mol.",["11.7 g","29.3 g","58.5 g","117 g"],1,"Mass=0.50 times 58.5=29.25 g."],
        ["A reaction produces 8.0 g product theoretically but yields 6.0 g. Percent yield is",["25%","60%","75%","133%"],2,"Percent yield=6.0/8.0 times 100=75%."],
        ["In a complete ionic equation, a spectator ion is one that",["Changes oxidation number","Appears unchanged on both sides","Forms a precipitate","Is consumed completely"],1,"Spectator ions remain dissolved and unchanged."],
        ["Mixing AgNO3(aq) and NaCl(aq) forms which precipitate?",["AgCl(s)","NaNO3(s)","AgNO3(s)","NaClO(s)"],0,"Silver chloride is insoluble in water."],
        ["In Zn+Cu2+->Zn2++Cu, which species is oxidized?",["Zn","Cu2+","Zn2+","Cu"],0,"Zinc loses electrons and its oxidation number increases."],
        ["What is the coefficient of O2 when C3H8+O2->CO2+H2O is balanced with whole-number coefficients?",["3","4","5","7"],2,"Balanced combustion is C3H8+5O2->3CO2+4H2O."],
        ["A 0.20 L solution contains 0.50 mol solute. Its molarity is",["0.10 M","0.40 M","2.5 M","10 M"],2,"Molarity=n/V=0.50/0.20=2.5 M."],
        ["What volume of 2.0 M stock solution contains 0.50 mol solute?",["0.10 L","0.25 L","1.0 L","4.0 L"],1,"V=n/M=0.50/2.0=0.25 L."],
        ["A solution is diluted from 1.0 L to 4.0 L. Its concentration becomes",["Four times larger","One-quarter as large","Unchanged","Zero"],1,"Dilution conserves solute moles, so concentration falls by four."],
        ["Which reaction is an acid-base neutralization?",["HCl+NaOH->NaCl+H2O","AgNO3+NaCl->AgCl+NaNO3","2Mg+O2->2MgO","CaCO3->CaO+CO2"],0,"An acid and base react to form water and a salt."],
        ["For 2Al+3Cl2->2AlCl3, how many moles Cl2 react with 4 mol Al?",["3 mol","4 mol","6 mol","12 mol"],2,"The ratio is 3 mol Cl2 per 2 mol Al, giving 6 mol."],
        ["Which change conserves atoms in a chemical equation?",["Changing subscripts","Changing coefficients","Removing a product","Changing element symbols"],1,"Balancing changes coefficients, preserving chemical formulas."]
      ]}
    $$::jsonb),
    ('AP Chemistry', 'Unit 5 Kinetics', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["For rate=k[A]^2[B], doubling [A] while holding [B] fixed changes rate by",["2 times","4 times","6 times","8 times"],1,"The second-order dependence on A gives a factor of 2^2=4."],
        ["A catalyst increases reaction rate primarily by",["Increasing the reaction enthalpy","Lowering activation energy","Changing the equilibrium constant","Increasing reactant concentration"],1,"A catalyst offers a pathway with lower activation energy."],
        ["Raising temperature usually increases rate because",["Molecules stop colliding","A greater fraction of collisions exceed activation energy","The activation energy becomes zero","The reaction becomes exothermic"],1,"More particles have energy at or above the activation threshold."],
        ["If rate=k[A] and [A] doubles, the rate",["Halves","Doubles","Quadruples","Stays fixed"],1,"A first-order rate is directly proportional to [A]."],
        ["For a zero-order reaction in A, doubling [A] changes the initial rate by",["One-half","Two times","Four times","No change"],3,"A zero-order rate is independent of [A]."],
        ["A reaction mechanism's rate-determining step is",["The fastest elementary step","The slowest elementary step","Always the last step","The step with no reactants"],1,"The slowest step limits the overall rate."],
        ["A reaction intermediate is a species that is",["Consumed in an early step and regenerated later","A catalyst added externally","Present only at equilibrium","Never formed during the mechanism"],0,"Intermediates are produced and then consumed in later steps."],
        ["Increasing reactant concentration often increases rate because it",["Raises collision frequency","Lowers particle speed to zero","Changes the balanced equation","Removes activation energy"],0,"More particles per volume generally cause more frequent collisions."],
        ["For a first-order reaction, the half-life is",["Proportional to initial concentration","Independent of initial concentration","Always zero","Inversely proportional to k squared"],1,"First-order half-life is ln(2)/k."],
        ["A rate constant has units of s^-1 for which overall reaction order?",["Zero","First","Second","Third"],1,"First-order rate constants have units of inverse time."],
        ["A powdered solid reacts faster than the same mass in one large chunk because powder has",["Lower temperature","Greater exposed surface area","Lower concentration","Less total matter"],1,"More exposed area allows more effective collisions."],
        ["An elementary step A+B->products is",["First order overall","Second order overall","Zero order overall","Third order overall"],1,"For an elementary step, molecularity gives rate=k[A][B]."],
        ["A reaction coordinate diagram has products lower in energy than reactants. The forward reaction is",["Endothermic","Exothermic","At equilibrium","Impossible"],1,"Lower product energy means energy is released."],
        ["The activation energy is the energy difference between reactants and",["Products","The transition state","The catalyst","The solvent"],1,"Activation energy measures the barrier to the transition state."],
        ["A proposed rate law is most directly determined from",["Balanced-equation coefficients","Experimental rate data","Product color only","Molar masses"],1,"Rate orders are measured experimentally, except for elementary steps."]
      ]}
    $$::jsonb),
    ('AP Chemistry', 'Unit 6 Thermodynamics', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A 50 g sample absorbs 4200 J and warms by 20 C. Its specific heat is",["0.24 J/(g C)","2.1 J/(g C)","4.2 J/(g C)","42 J/(g C)"],2,"c=q/(m delta T)=4200/(50 times 20)=4.2 J/(g C)."],
        ["A system releases 75 J of heat to its surroundings. For the system, q is",["-75 J","0 J","+75 J","+150 J"],0,"Heat leaving the system is negative."],
        ["At constant pressure, a reaction absorbs heat. Its enthalpy change is",["Negative","Positive","Zero","Undefined"],1,"Endothermic heat absorption corresponds to positive delta H."],
        ["A reaction has delta H=-40 kJ. The forward reaction is",["Endothermic","Exothermic","At equilibrium","Entropy-free"],1,"Negative enthalpy indicates heat released at constant pressure."],
        ["If a reaction is reversed, its enthalpy change",["Keeps the same sign","Changes sign","Is squared","Becomes zero"],1,"Reversing a process reverses the heat flow."],
        ["For a process, delta H=+20 kJ and delta S=+100 J/K. At 400 K, delta G is",["-20 kJ","-10 kJ","+20 kJ","+60 kJ"],0,"Convert T delta S to 40 kJ; delta G=20-40=-20 kJ."],
        ["A reaction has delta H=+30 kJ and delta S=+100 J/K. It becomes favorable above",["30 K","100 K","300 K","3000 K"],2,"Set delta G=0: T=30000/100=300 K; above this delta G is negative."],
        ["For an exothermic process with negative entropy change, lower temperature generally",["Favors spontaneity","Opposes spontaneity","Has no effect","Makes delta H positive"],0,"The negative enthalpy term dominates at lower T."],
        ["A calorimeter solution gains 500 J from a reaction. Assuming isolation, reaction heat is",["+500 J","-500 J","0 J","+1000 J"],1,"Heat gained by surroundings equals heat lost by the reaction."],
        ["When a pure substance melts at its melting point, added heat primarily",["Raises temperature","Overcomes intermolecular attractions","Reduces particle energy to zero","Changes atomic number"],1,"During melting, energy changes phase rather than temperature."],
        ["For a reaction, delta H is approximately the sum of",["Bond energies of bonds formed minus broken","Bond energies broken minus bonds formed","All bond energies multiplied","Only product bond energies"],1,"Breaking bonds costs energy; forming bonds releases energy."],
        ["A system absorbs 2 kJ of heat and does 0.5 kJ of work on surroundings. Using delta E=q+w, delta E is",["+1.5 kJ","+2.5 kJ","-1.5 kJ","-2.5 kJ"],0,"q=+2 and w=-0.5 kJ, so delta E=+1.5 kJ."],
        ["For a process at constant pressure, q_p equals",["Delta H","Delta G","Delta S","Work only"],0,"Enthalpy change equals heat at constant pressure."],
        ["A positive entropy change generally corresponds to",["Less dispersal of energy","Greater dispersal or more accessible arrangements","Fewer possible microstates","A guaranteed negative delta G"],1,"Entropy tracks dispersal and the number of accessible arrangements."],
        ["An ideal gas expands freely into a vacuum. The work done by the gas is",["Positive","Negative","Zero","Equal to its heat"],2,"With no external pressure, expansion work is zero."]
      ]}
    $$::jsonb),
    ('AP Chemistry', 'Unit 7 Equilibrium', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["For 2SO2(g)+O2(g)<=>2SO3(g), the equilibrium expression Kc is",["[SO3]^2/([SO2]^2[O2])","[SO2]^2[O2]/[SO3]^2","[SO3]/([SO2][O2])","[SO3]^2[SO2]^2[O2]"],0,"Balanced coefficients become exponents in the concentration expression."],
        ["For A<=>B, Q=0.2 and K=4. The mixture shifts net",["Left","Right","Neither direction","Until concentrations are equal"],1,"Q<K means products must form to reach equilibrium."],
        ["At dynamic equilibrium, forward and reverse reaction rates are",["Both zero","Equal","Unequal","Equal only if concentrations match"],1,"Equal opposing rates create no net composition change."],
        ["For an exothermic forward reaction, raising temperature shifts equilibrium",["Toward products","Toward reactants","Not at all","Only if a catalyst is present"],1,"Added heat favors the endothermic reverse direction."],
        ["Compressing N2+3H2<=>2NH3 at constant temperature shifts toward",["Reactants","Products","Neither side","The side with higher molar mass"],1,"The product side has fewer gas moles."],
        ["Pure solids are omitted from K expressions because their activities are",["Zero","Constant","Infinite","Equal to their masses"],1,"The activity of a pure solid is treated as constant."],
        ["If Q=K, the system is",["Reactant-favored and shifting left","Product-favored and shifting right","At equilibrium","Unable to react"],2,"Q equals K at equilibrium."],
        ["If Q>K, the net reaction proceeds",["Forward","In reverse","In both directions at equal rates already","Only if heated"],1,"Excess products are consumed as the mixture shifts left."],
        ["Reversing a reaction changes K to",["-K","1/K","K^2","K"],1,"The product/reactant ratio is inverted."],
        ["Multiplying every coefficient in a reaction by 2 changes K to",["2K","K/2","K^2","sqrt(K)"],2,"Scaling the reaction by n raises K to power n."],
        ["Adding a catalyst to an equilibrium mixture changes",["K","Equilibrium composition","The time to reach equilibrium","Delta G standard"],2,"A catalyst speeds both directions but does not alter equilibrium."],
        ["For H2(g)+I2(g)<=>2HI(g), decreasing volume at constant T causes",["A shift left","A shift right","No shift from pressure alone","K to increase"],2,"There are equal gas-mole counts on both sides."],
        ["Adding a gaseous reactant initially makes Q",["Increase above K","Decrease below K","Become infinite","Stay equal to K"],1,"Increasing a reactant denominator lowers Q for the forward reaction."],
        ["A very large K value indicates that equilibrium favors",["Reactants","Products","Equal concentrations","Only solids"],1,"A large products-to-reactants ratio means products are favored."],
        ["For A(g)<=>2B(g), adding inert gas at constant volume and temperature",["Shifts right","Shifts left","Does not change partial pressures of reacting gases","Changes K"],2,"At constant volume, reacting-gas partial pressures remain unchanged."]
      ]}
    $$::jsonb),
    ('AP Chemistry', 'Unit 8 Acids and Bases', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A solution has [H3O+]=1.0e-5 M. Its pH is",["5","9","-5","7"],0,"pH=-log[H3O+]=5."],
        ["At 25 C, a solution has pOH=4. Its pH is",["4","7","10","14"],2,"At 25 C, pH+pOH=14."],
        ["A Bronsted-Lowry base is a proton",["Donor","Acceptor","Neutron donor","Electron-pair acceptor only"],1,"A Bronsted-Lowry base accepts H+."],
        ["Which pair is a conjugate acid-base pair?",["H2CO3 and HCO3-","HCl and NaCl","NaOH and Na+","NH3 and Cl-"],0,"Conjugates differ by one proton."],
        ["A buffer has equal concentrations of weak acid HA and A-. Its pH is",["pKa","7 always","pKb","14"],0,"Henderson-Hasselbalch gives pH=pKa when [A-]=[HA]."],
        ["A weak acid has a smaller Ka than another weak acid. It is generally",["More ionized","Less ionized","A stronger acid","Always more concentrated"],1,"Smaller Ka means less dissociation at comparable conditions."],
        ["If Ka=1e-4, pKa is",["-4","2","4","10"],2,"pKa=-log Ka=4."],
        ["A weak base B reacts with water to form",["BH+ and OH-","B- and H3O+","H2 and O2","BH2+ only"],0,"The base accepts H+ from water, leaving OH-."],
        ["At the half-equivalence point in a weak-acid/strong-base titration",["pH=pKa","pH=7 always","pOH=pKa","All HA is consumed"],0,"At half-equivalence, [HA]=[A-]."],
        ["At 25 C, the equivalence point of a strong acid-strong base titration is near",["pH 3","pH 5","pH 7","pH 11"],2,"The salt ions do not appreciably hydrolyze."],
        ["Which ion can act as either a proton donor or acceptor?",["Cl-","HCO3-","Na+","NO3-"],1,"Bicarbonate can donate H+ to form CO3^2- or accept H+ to form H2CO3."],
        ["A buffer resists added OH- mainly because",["HA reacts with OH-","A- releases electrons","Water stops ionizing","Salt precipitates"],0,"The weak acid neutralizes added hydroxide."],
        ["A 0.10 M strong monoprotic acid is diluted to 0.010 M. The pH changes by about",["-1","+1","+10","No change"],1,"A tenfold decrease in hydronium raises pH by one unit."],
        ["A 25.0 mL acid sample is neutralized by 20.0 mL of 0.50 M NaOH. For a monoprotic acid, its concentration is",["0.20 M","0.40 M","0.50 M","1.0 M"],1,"Moles base=0.0100; divide by 0.0250 L acid to get 0.40 M."],
        ["A weak-base/strong-acid titration has an acidic solution at equivalence because",["The conjugate acid of the weak base reacts with water","The strong acid disappears","The weak base becomes a strong base","Water has pH below zero"],0,"The weak base's conjugate acid donates protons to water."]
      ]}
    $$::jsonb),
    ('AP Chemistry', 'Unit 9 Applications of Thermodynamics', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["At constant temperature and pressure, a process is spontaneous in the forward direction when",["Delta G<0","Delta G>0","Delta G=Delta H","Delta S=0"],0,"A negative Gibbs energy change favors the forward process."],
        ["If Delta G standard=-RT ln K and K>1, Delta G standard is",["Negative","Positive","Zero always","Undefined"],0,"ln K is positive for K>1, making -RT ln K negative."],
        ["A galvanic cell has E standard cell=+0.80 V. Its Delta G standard is",["Positive","Negative","Zero","Equal to 0.80 kJ"],1,"Delta G standard=-nFE standard, so it is negative."],
        ["A catalyst changes an equilibrium constant by",["Increasing it","Decreasing it","Not changing it","Setting it to 1"],2,"A catalyst changes rates, not thermodynamic equilibrium."],
        ["At equilibrium, the reaction Gibbs energy Delta G for the current mixture is",["Negative","Positive","Zero","Always equal to Delta H"],2,"There is no net driving force at equilibrium."],
        ["The nonstandard Gibbs energy relation is",["Delta G=Delta G standard+RT ln Q","Delta G=Delta G standard-RT ln Q","Delta G=RT ln K","Delta G=Q/RT"],0,"Composition enters through RT ln Q."],
        ["If Q<K, the forward reaction has Delta G",["Negative","Positive","Zero","Equal to Delta G standard"],0,"Delta G=RT ln(Q/K), which is negative when Q<K."],
        ["A reaction has Delta H<0 and Delta S>0. It is favorable",["At all temperatures","Only at low temperature","Only at high temperature","Never"],0,"Both terms make Delta G negative for positive T."],
        ["If K=1, Delta G standard is",["RT","-RT","Zero","One joule"],2,"ln(1)=0."],
        ["For an endothermic process with positive Delta S, increasing temperature makes Delta G",["More negative","More positive","Unchanged","Equal to Delta H"],0,"The -T Delta S term becomes more negative."],
        ["In a galvanic cell, electrons flow through the external wire from",["Anode to cathode","Cathode to anode","Salt bridge to anode","Cathode to salt bridge"],0,"Oxidation at the anode supplies electrons."],
        ["A spontaneous galvanic cell reaction has Ecell",["Positive","Negative","Zero","Equal to K"],0,"Positive cell potential corresponds to negative Delta G."],
        ["Increasing product concentration at fixed T and P generally makes forward Delta G",["More positive","More negative","Unchanged","Exactly zero"],0,"Increasing Q raises RT ln(Q/K)."],
        ["A process has Delta H=+24 kJ/mol and Delta S=+80 J/(mol K). It becomes favorable above",["30 K","80 K","300 K","3000 K"],2,"T=Delta H/Delta S=24000/80=300 K; above it Delta G is negative."],
        ["A cell transfers 2 mol electrons with E standard=0.50 V. Delta G standard is",["Positive","Negative","Zero","Not inferable"],1,"Delta G standard=-nFE standard, which is negative for positive E."]
      ]}
    $$::jsonb),
    ('AP Calculus AB', 'Unit 1 Limits & Continuity', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["Evaluate lim x->3 (x^2-9)/(x-3).",["3","6","9","Does not exist"],1,"Factor the numerator as (x-3)(x+3); the limit is 6."],
        ["If f(x)=2x+1 for x<2 and f(x)=x^2 for x>=2, is f continuous at x=2?",["Yes; both sides equal 4","No; left limit is 5 and f(2)=4","No; the right limit does not exist","Yes; continuity ignores the function value"],1,"The left limit is 5 while the right limit and function value are 4."],
        ["If f is continuous on [1,5], f(1)=-2, and f(5)=4, which conclusion follows?",["f has exactly one zero","f has at least one zero in (1,5)","f is differentiable on (1,5)","f is increasing"],1,"The Intermediate Value Theorem guarantees a zero between opposite signs."],
        ["Evaluate lim x->0 sin(4x)/x.",["0","1","4","Does not exist"],2,"Rewrite as 4 times sin(4x)/(4x); the limit is 4."],
        ["Evaluate lim x->0 (sqrt(1+x)-1)/x.",["0","1/2","1","Does not exist"],1,"Rationalizing gives 1/(sqrt(1+x)+1), which tends to 1/2."],
        ["For x<1 near 1, f(x)=1/(x-1). The left-hand limit as x approaches 1 is",["Positive infinity","Negative infinity","0","1"],1,"The denominator approaches zero through negative values."],
        ["If lim x->2 f(x)=5 but f(2)=7, which is true?",["f is continuous at 2","f is not continuous at 2","The limit must equal 7","f(2) is undefined"],1,"Continuity requires the limit to equal the function value."],
        ["Evaluate lim x->0 (1-cos x)/x^2.",["0","1/2","1","Does not exist"],1,"The standard trigonometric limit is one-half."],
        ["A function has a removable discontinuity at x=a when",["Its two-sided limit exists but differs from or is not assigned as f(a)","Its values grow without bound","Its left and right limits have opposite signs","It is constant near a"],0,"A hole can be filled by defining f(a) to equal the finite limit."],
        ["Evaluate lim x->infinity (3x^2+1)/(x^2-4).",["0","1","3","Infinity"],2,"For equal polynomial degrees, the limit is the ratio of leading coefficients."],
        ["If f'(c) exists, then f is necessarily",["Continuous at c","Differentiable everywhere","Increasing at c","Zero at c"],0,"Differentiability at a point implies continuity there."],
        ["Evaluate lim h->0 ((2+h)^2-4)/h.",["0","2","4","Does not exist"],2,"Expand to 4h+h^2 and divide by h; the limit is 4."],
        ["If lim x->a f(x)=L and lim x->a g(x)=M, then lim x->a (f(x)+g(x)) is",["L+M","LM","L/M always","Undefined"],0,"Limits preserve sums when the component limits exist."],
        ["Which condition is required for continuity at x=a?",["f(a) exists, the limit exists, and they are equal","f'(a)=0","f is bounded on all real numbers","The function is one-to-one"],0,"These three conditions define continuity at a point."],
        ["Evaluate lim x->0 (e^(2x)-1)/x.",["0","1","2","Does not exist"],2,"The derivative of e^(2x) at zero is 2."]
      ]}
    $$::jsonb),
    ('AP Calculus AB', 'Unit 2 Differentiation', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["If f(x)=x^5-3x^2, what is f'(x)?",["5x^4-6x","5x^4-3x","x^4-6x","5x^5-6x^2"],0,"Apply the power rule term by term."],
        ["If f(x)=sin x, what is f'(pi/3)?",["1/2","sqrt(3)/2","-1/2","-sqrt(3)/2"],0,"The derivative is cos x; cos(pi/3)=1/2."],
        ["If f(x)=x^2 cos x, then f'(x) is",["2x cos x-x^2 sin x","2x sin x+x^2 cos x","x^2 sin x","2x cos x+x^2 sin x"],0,"The product rule gives 2x cos x plus x^2 times -sin x."],
        ["If f(x)=(x^2+1)/(x-1), the quotient rule numerator is",["2x(x-1)-(x^2+1)","(x^2+1)-2x(x-1)","2x(x-1)+(x^2+1)","2x-(x-1)"],0,"Use u'v-uv' over v squared."],
        ["If y=(3x+1)^4, dy/dx is",["4(3x+1)^3","12(3x+1)^3","12(3x+1)^4","(3x+1)^3"],1,"Chain rule multiplies by the inner derivative 3."],
        ["A function has f(2)=5 and f'(2)=-3. The tangent line at x=2 is",["y-5=-3(x-2)","y-2=-3(x-5)","y=5x-3","y-5=3(x-2)"],0,"Use point-slope form with point (2,5) and slope -3."],
        ["If s(t)=t^3-6t, what is the acceleration at t=2?",["0","6","12","18"],2,"Velocity is 3t^2-6; acceleration is 6t, so a(2)=12."],
        ["The derivative of ln(5x) for x>0 is",["1/(5x)","1/x","5/x","ln 5"],1,"By the chain rule, (5)/(5x)=1/x."],
        ["If f'(x)=0 for every x in an interval, f is",["Constant on that interval","Increasing there","Decreasing there","Equal to zero there"],0,"A function with zero derivative throughout an interval is constant."],
        ["The derivative of sqrt(x) for x>0 is",["2sqrt(x)","1/(2sqrt(x))","1/sqrt(x)","sqrt(x)/2"],1,"Write sqrt(x)=x^(1/2) and apply the power rule."],
        ["If f(x)=e^(x^2), then f'(x) is",["e^(2x)","2x e^(x^2)","x e^(x^2)","2e^x"],1,"The chain rule gives e^(x^2) times 2x."],
        ["If f is differentiable and f'(3)=4, the linear approximation near x=3 is",["f(3)+4(x-3)","4f(3)+x-3","f(3)+4x","f(3)(x-3)+4"],0,"The tangent-line approximation is f(a)+f'(a)(x-a)."],
        ["The derivative of cos(2x) is",["sin(2x)","-sin(2x)","-2sin(2x)","2cos(2x)"],2,"Chain rule gives -sin(2x) times 2."],
        ["If f(x)=3x^2-2x, what is f'(1)?",["2","4","6","8"],1,"f'=6x-2, so f'(1)=4."],
        ["If f(x)=x^2+2x, the average rate of change on [1,3] equals",["4","5","6","8"],2,"(f(3)-f(1))/(3-1)=(15-3)/2=6."]
      ]}
    $$::jsonb),
    ('AP Calculus AB', 'Unit 3 Composite, Implicit & Inverse Functions', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["For y=(x^2+1)^3, dy/dx is",["3(x^2+1)^2","6x(x^2+1)^2","6x(x^2+1)^3","3x^2(x^2+1)^2"],1,"The chain rule gives 3(x^2+1)^2 times 2x."],
        ["If x^2+y^2=25, dy/dx is",["x/y","-x/y","-y/x","y/x"],1,"Implicit differentiation gives 2x+2y y'=0."],
        ["If f(2)=7 and f'(2)=3, then (f inverse)'(7) is",["3","1/3","7/3","-1/3"],1,"The inverse derivative is 1/f'(2)=1/3."],
        ["If y=sin(3x), dy/dx is",["cos(3x)","3cos(3x)","-3sin(3x)","3sin(3x)"],1,"Chain rule multiplies cos(3x) by 3."],
        ["For x^2+xy+y^2=7, dy/dx equals",["-(2x+y)/(x+2y)","(2x+y)/(x+2y)","-(x+2y)/(2x+y)","-2x-y"],0,"Differentiate to get 2x+y+xy'+2yy'=0."],
        ["If f(x)=g(h(x)), then f'(x) is",["g'(h(x))+h'(x)","g'(h(x))h'(x)","g'(x)h(x)","g(h'(x))"],1,"The chain rule multiplies the outer derivative by the inner derivative."],
        ["If f(x)=sqrt(1+cos x), then f'(x) is",["-sin x/(2sqrt(1+cos x))","sin x/(2sqrt(1+cos x))","-2sin x sqrt(1+cos x)","cos x/(2sqrt(1+cos x))"],0,"Differentiate the square root and then cos x."],
        ["If f is invertible and f'(a) is nonzero, the tangent slope of f inverse at y=f(a) is",["f'(a)","1/f'(a)","-f'(a)","f(a)"],1,"Inverse functions exchange input and output, so slopes are reciprocals."],
        ["Differentiate x^3+y^3=9xy implicitly.",["dy/dx=(3y-x^2)/(y^2-3x)","dy/dx=(x^2-3y)/(y^2-3x)","dy/dx=3x^2+3y^2","dy/dx=9"],0,"3x^2+3y^2 y'=9y+9x y'; solve for y'."],
        ["If g(x)=f(2x-1), then g'(x) is",["f'(2x-1)","2f'(2x-1)","(2x-1)f'(x)","2f(x)"],1,"The inner linear function has derivative 2."],
        ["Let h(x)=sqrt(f(x)), with f(4)=9 and f'(4)=6. What is h'(4)?",["1/2","1","2","3"],1,"Chain rule gives h'=f'/(2sqrt(f)); at 4 this is 6/6=1."],
        ["If f(x)=x^2 and g(x)=3x+1, then (f composed with g)'(x) is",["6(3x+1)","2(3x+1)","3x^2","(3x+1)^2"],0,"The composite is (3x+1)^2; chain rule gives 6(3x+1)."],
        ["If f(1)=4 and f'(1)=2, then the tangent slope of f inverse at x=4 is",["2","1/2","4","-2"],1,"The inverse derivative at 4 is the reciprocal of f'(1)."],
        ["For y=ln(x^2+4), dy/dx is",["1/(x^2+4)","2x/(x^2+4)","2x ln(x^2+4)","x/(x^2+4)"],1,"The chain rule gives the derivative of the inside over the inside."],
        ["If x^2+4y^2=20, the slope at (2,2) is",["-1/4","-1/2","1/4","1/2"],0,"2x+8y y'=0, so y'=-x/(4y)=-1/4."]
      ]}
    $$::jsonb),
    ('AP Calculus AB', 'Unit 4 Contextual Applications of Differentiation', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A circle's radius grows at 2 cm/s. When r=3 cm, how fast is its area growing?",["6pi cm^2/s","9pi cm^2/s","12pi cm^2/s","18pi cm^2/s"],2,"A=pi r^2, so dA/dt=2pi r dr/dt=12pi."],
        ["A 10 ft ladder has its base move away from a wall at 1 ft/s. When the base is 6 ft from the wall, the top moves",["Up at 3/4 ft/s","Down at 3/4 ft/s","Down at 4/3 ft/s","Up at 4/3 ft/s"],1,"x^2+y^2=100 gives dy/dt=-(x/y)dx/dt=-6/8=-3/4."],
        ["A differentiable function has f'(x)>0 on an interval. Then f is",["Decreasing","Increasing","Constant","Concave down"],1,"A positive derivative means the function increases."],
        ["If f'(x) changes from positive to negative at x=c, f has a local",["Minimum","Maximum","Inflection point only","Discontinuity"],1,"The function switches from increasing to decreasing."],
        ["A rectangle has perimeter 20. Which dimensions maximize its area?",["2 by 8","4 by 6","5 by 5","1 by 9"],2,"For a fixed perimeter, the square maximizes area."],
        ["A particle has position s(t)=t^3-6t^2+9t. Its velocity at t=2 is",["-3","0","3","9"],0,"v=3t^2-12t+9; v(2)=12-24+9=-3."],
        ["For a differentiable function on [a,b], the Mean Value Theorem guarantees c with",["f'(c)=f(b)-f(a)","f'(c)=(f(b)-f(a))/(b-a)","f(c)=0","f'(c)=0 always"],1,"The derivative equals the average rate of change at some interior point."],
        ["A rectangular enclosure uses 40 m of fencing for three sides along a wall. The maximum area occurs when the side perpendicular to the wall is",["5 m","10 m","20 m","40 m"],1,"Let width x and length 40-2x; area max occurs at x=10."],
        ["A particle moves with v(t)=t-4 for t>=0. It changes direction at",["t=0","t=2","t=4","t=8"],2,"Direction changes where velocity crosses zero, at t=4."],
        ["A rectangle has x=4, y=3, dx/dt=2, and dy/dt=-1. How fast is its area changing?",["-4 square units/s","0 square units/s","2 square units/s","10 square units/s"],2,"A=xy, so dA/dt=y dx/dt+x dy/dt=6-4=2."],
        ["A quantity has f'(x)=0 at x=2 but f' does not change sign there. The point is",["A local extremum necessarily","A critical point but not necessarily an extremum","A discontinuity","An inflection point necessarily"],1,"A zero derivative is critical, but a sign change is needed for an extremum test."],
        ["A car's position is s(t)=t^2+4t. Its speed at t=3 is",["6","8","10","13"],2,"Velocity is 2t+4=10, which is positive so speed is 10."],
        ["A particle has position s(t)=t^2-5t. At what time does its velocity equal 3?",["2 s","3 s","4 s","5 s"],2,"Velocity is 2t-5; setting it to 3 gives t=4 s."],
        ["A differentiable function satisfies f'(x)<0 on (a,b). Then f is",["Increasing on (a,b)","Decreasing on (a,b)","Constant on (a,b)","Concave up on (a,b)"],1,"Negative derivative implies decrease."],
        ["A sphere's radius shrinks at 0.2 cm/s. At r=5 cm, its volume changes at",["-20pi cm^3/s","-10pi cm^3/s","-5pi cm^3/s","-pi cm^3/s"],0,"V=4pi r^3/3, so dV/dt=4pi r^2 dr/dt=-20pi."]
      ]}
    $$::jsonb),
    ('AP Calculus AB', 'Unit 5 Analytical Applications of Differentiation', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["For f(x)=x^3-3x, the critical numbers are",["-1 and 1","0 only","-3 and 3","-sqrt(3) and sqrt(3)"],0,"f'=3x^2-3=0 at x=+-1."],
        ["If f'(x)>0 on (-infinity,2) and f'(x)<0 on (2,infinity), f has at x=2",["A local minimum","A local maximum","An inflection point","No critical point"],1,"The derivative changes from positive to negative."],
        ["If f''(x)>0 on an interval, the graph is",["Concave down","Concave up","Increasing necessarily","Decreasing necessarily"],1,"Positive second derivative indicates concavity up."],
        ["For f(x)=x^3, where is the inflection point?",["x=-1","x=0","x=1","No inflection point"],1,"f''=6x changes sign at zero."],
        ["On a closed interval, an absolute maximum can occur at",["Only a critical point","Only an endpoint","A critical point or an endpoint","Any point with f=0"],2,"The closed-interval method checks critical points and endpoints."],
        ["For f(x)=x^2-4x on [0,5], the absolute minimum value is",["-4","-3","0","5"],0,"The vertex is x=2 with f(2)=-4; endpoint values are 0 and 5."],
        ["If f' is increasing on an interval, then f is",["Concave up","Concave down","Constant","Decreasing"],0,"An increasing derivative means f'' is positive where it exists."],
        ["If f'(x)=(x-1)(x+2), f is increasing on",["(-2,1)","(-infinity,-2) and (1,infinity)","(-infinity,1)","(-2,infinity)"],1,"The derivative is positive outside its roots and negative between them."],
        ["For f(x)=x^4, the second derivative at x=0 is",["Negative","Zero","Positive","Undefined"],1,"f''=12x^2, so f''(0)=0."],
        ["A graph has f'(x)<0 and f''(x)>0. The function is",["Increasing and concave up","Decreasing and concave up","Decreasing and concave down","Increasing and concave down"],1,"Negative first derivative means decreasing; positive second means concave up."],
        ["For f(x)=ln x on x>0, f is",["Increasing and concave down","Decreasing and concave up","Increasing and concave up","Decreasing and concave down"],0,"f'=1/x>0 and f''=-1/x^2<0."],
        ["If f'(c)=0 and f''(c)<0, the second derivative test indicates",["A local minimum","A local maximum","An inflection point","No conclusion"],1,"A negative second derivative gives a local maximum at a critical point."],
        ["For f(x)=x^3-6x^2, the inflection x-coordinate is",["0","2","4","6"],1,"f''=6x-12 changes sign at x=2."],
        ["If a continuous function has exactly one critical number and it is a local minimum, its absolute minimum on a closed interval",["Must be at that point if the point is inside and endpoint values are larger","Must be at the left endpoint","Cannot be determined under any conditions","Must be zero"],0,"Compare the critical point with endpoints; if endpoint values are larger it is absolute minimum."],
        ["For f(x)=x/(x^2+1), the derivative is",["(1-x^2)/(x^2+1)^2","(1+x^2)/(x^2+1)^2","2x/(x^2+1)^2","1/(x^2+1)"],0,"Quotient rule gives (x^2+1-2x^2)/(x^2+1)^2."]
      ]}
    $$::jsonb),
    ('AP Calculus AB', 'Unit 6 Integration & Accumulation', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["Evaluate integral from 0 to 2 of 3x^2 dx.",["4","6","8","12"],2,"An antiderivative is x^3, giving 8."],
        ["If F'=f, then integral from a to b of f(x) dx equals",["F(a)-F(b)","F(b)-F(a)","f(b)-f(a)","F'(b)-F'(a)"],1,"The Fundamental Theorem gives net change F(b)-F(a)."],
        ["A rate r(t)=5 items/min acts for 3 min. The accumulated increase is",["8 items","15 items","5/3 items","2 items"],1,"Integral of a constant rate is rate times time."],
        ["The average value of f(x)=x on [0,4] is",["1","2","3","4"],1,"Average value is (1/4) integral_0^4 x dx=2."],
        ["Evaluate integral from 1 to 3 of 2x dx.",["4","6","8","10"],2,"An antiderivative is x^2; 9-1=8."],
        ["Evaluate integral from 0 to 2 of (x+1) dx.",["2","3","4","6"],2,"An antiderivative is x^2/2+x; evaluation gives 4."],
        ["A particle has velocity v(t)=2t-1 on [0,3]. Its displacement is",["3","6","7","9"],1,"Integral gives [t^2-t]_0^3=9-3=6."],
        ["If f(x)>=0 on [a,b], the definite integral represents",["Signed area under the graph","Always the perimeter","The maximum value","The derivative at b"],0,"For nonnegative f, the integral equals geometric area."],
        ["A right-endpoint Riemann sum uses sample points",["At the left side of each subinterval","At the right side of each subinterval","Only at x=0","At interval midpoints"],1,"Each rectangle height is sampled at its right endpoint."],
        ["If integral from 0 to 4 of f(x) dx=10 and integral from 0 to 1 of f(x) dx=3, then integral from 1 to 4 f(x) dx is",["3","7","10","13"],1,"Subtract the first subinterval's accumulation: 10-3=7."],
        ["A quantity Q has rate Q'(t)=4t. If Q(0)=2, then Q(3) is",["8","14","18","20"],3,"Q(3)=2+integral_0^3 4t dt=2+18=20."],
        ["Evaluate integral from 0 to pi of sin x dx.",["0","1","2","pi"],2,"An antiderivative is -cos x; the value is 1-(-1)=2."],
        ["If f is continuous and F(x)=integral from 1 to x of f(t)dt, then F'(x)=",["f(1)","f(x)","f'(x)","Integral from 1 to x of f'(t)dt"],1,"The first part of the Fundamental Theorem differentiates the accumulation."],
        ["A velocity graph is above the time axis for an interval. During that interval, position",["Decreases","Increases","Stays fixed","Must be zero"],1,"Positive velocity means position is increasing."],
        ["If integral from 0 to 5 of f is 8 and integral from 0 to 2 of f is -1, integral from 2 to 5 of f is",["-9","-1","7","9"],3,"Additivity gives 8=(-1)+the desired integral, so it is 9."]
      ]}
    $$::jsonb),
    ('AP Calculus AB', 'Unit 7 Differential Equations', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["Solve dy/dx=3y with y(0)=2.",["2e^(3x)","3e^(2x)","2+3x","6x"],0,"The solution is Ce^(3x); the initial condition gives C=2."],
        ["For y'=x^2 and y(0)=1, find y(2).",["5/3","8/3","11/3","17/3"],2,"Integrate: y=x^3/3+C, C=1; y(2)=11/3."],
        ["For y'=x+y, the slope at (1,2) is",["1","2","3","4"],2,"Substitute x=1 and y=2 to get slope 3."],
        ["Euler's method with step 0.2 at (0,1) for y'=y estimates y(0.2) as",["0.8","1.0","1.2","1.22"],2,"The Euler update is 1+0.2(1)=1.2."],
        ["For y'=y(5-y), positive equilibrium solutions are",["y=0 only","y=5 only","y=0 and y=5","y=1 and y=5"],2,"Set the derivative to zero: y=0 or y=5."],
        ["A solution to y'=-2y with y(0)=4 approaches as t increases",["Negative infinity","0","2","4"],1,"The solution 4e^(-2t) approaches zero."],
        ["An antiderivative family for y'=cos x is",["sin x+C","-sin x+C","cos x+C","-cos x+C"],0,"The derivative of sin x is cos x."],
        ["For y'=6x and y(1)=0, y(2) is",["6","9","12","18"],1,"Integrate to y=3x^2+C; C=-3, so y(2)=9."],
        ["The slope field for y'=x has horizontal segments along",["x=0","y=0","x=y","Everywhere"],0,"The slope is zero when x=0."],
        ["If dP/dt=0.04P and P=250, the instantaneous growth rate is",["4","10","40","250"],1,"Rate=0.04 times 250=10."],
        ["For y'=2x-3, y(4)-y(1) equals",["3","6","9","12"],2,"Integrate from 1 to 4: [x^2-3x]_1^4=9."],
        ["The solution of y'=0 through (3,-2) is",["y=3","y=-2","y=x-5","y=-2x"],1,"Zero derivative describes a constant function."],
        ["For y'=-y and y(0)=5, the initial slope is",["-5","-1","0","5"],0,"Substitute y=5 into y'=-y."],
        ["The differential equation dy/dx=xy is separable as",["dy/y=x dx","y dy=x dx","dy=xy","dx/y=x dy"],0,"Divide by y and multiply by dx."],
        ["At a point (2,3), a solution curve has slope -1. Its tangent line is",["y-3=-(x-2)","y-2=-(x-3)","y=x+1","y=-x+3"],0,"Point-slope form uses the given point and slope."]
      ]}
    $$::jsonb),
    ('AP Calculus AB', 'Unit 8 Applications of Integration', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A particle has velocity v(t)=3t on [0,2]. Its displacement is",["3","6","9","12"],1,"Integral from 0 to 2 of 3t is 6."],
        ["Find the area under y=x+2 from x=0 to x=3.",["6","9/2","21/2","15"],2,"Integral is [x^2/2+2x]_0^3=10.5."],
        ["A tank fills at r(t)=6-t liters/min from t=0 to t=4. How much water enters?",["8 L","16 L","20 L","24 L"],1,"Integral from 0 to 4 is 24-8=16 L."],
        ["The average value of f(x)=x^2 on [0,3] is",["1","3","4","9"],1,"Average value is one-third times integral x^2, equal to 3."],
        ["Area between y=3x and y=x^2 on [0,3] is",["0","9/2","9","27/2"],1,"Integrate 3x-x^2 from 0 to 3: 27/2-9=9/2."],
        ["A particle's velocity changes sign during an interval. Total distance is found using",["Integral of v","Integral of |v|","Integral of acceleration only","Endpoint displacement only"],1,"Absolute velocity adds distances traveled in both directions."],
        ["Water drains at 4 L/min for 7 min. The change in tank volume is",["-28 L","-11 L","+28 L","+11 L"],0,"A draining rate is negative: -4 times 7=-28 L."],
        ["A solid has cross-sectional area A(x)=2x for 0<=x<=3. Its volume is",["3","6","9","18"],2,"Volume is integral 0 to 3 of 2x dx=9."],
        ["The volume formed by rotating y=x about the x-axis from x=0 to x=2 is",["2pi/3","4pi/3","2pi","8pi/3"],3,"Disk method gives pi integral x^2 dx=8pi/3."],
        ["A rate r(t) is positive on [a,b]. The net accumulation over the interval is",["Negative","Positive","Zero","The average rate"],1,"Integrating a positive rate gives positive net change."],
        ["If f is increasing on [a,b], integral from a to b of f'(x) dx equals",["f(b)-f(a)","f(a)-f(b)","f'(b)-f'(a)","The average of f"],0,"The Fundamental Theorem gives the net change in f."],
        ["A particle has acceleration a(t)=2, with v(0)=1. Its velocity at t=4 is",["5","8","9","10"],2,"v(4)=1+integral 0 to 4 of 2 dt=9."],
        ["Area enclosed between y=2 and y=x on [0,2] is",["0","1","2","4"],2,"Integral of 2-x from 0 to 2 is 2."],
        ["A reservoir starts with 40 m^3. Water flows in at 9 m^3/hr and out at 4 m^3/hr for 3 hr. Final volume is",["45 m^3","55 m^3","67 m^3","79 m^3"],1,"Net inflow is 5 times 3=15, so final volume is 55 m^3."],
        ["The average value of a continuous function f on [a,b] is",["Integral_a^b f(x) dx","(1/(b-a)) integral_a^b f(x) dx","f(b)-f(a)","f'(b)"],1,"Average value divides total accumulation by interval length."]
      ]}
    $$::jsonb),
    ('AP Biology', 'Unit 1 Chemistry of Life', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["Water's partial charges result mainly from",["Equal electron sharing","Oxygen's greater electronegativity","Ionic bonds between H and O","Hydrogen losing its proton"],1,"Oxygen attracts shared electrons more strongly than hydrogen."],
        ["Water molecules cohere because of",["Peptide bonds","Hydrogen bonds between partial charges","Ionic bonds between oxygen atoms","Covalent bonds between separate molecules"],1,"Partial charges on neighboring water molecules form hydrogen bonds."],
        ["A solution at pH 4 has how many times the hydronium concentration of a solution at pH 6?",["2","10","100","1000"],2,"A two-unit pH decrease means 100 times more H3O+."],
        ["Hydrolysis of a polymer generally",["Joins monomers and releases water","Uses water to break a covalent bond","Removes every oxygen atom","Produces only lipids"],1,"Water is used to cleave a covalent bond."],
        ["The primary structure of a protein is its",["Overall three-dimensional shape","Amino acid sequence","Arrangement of subunits","Pattern of alpha helices"],1,"Primary structure is the linear sequence of amino acids."],
        ["A phospholipid is amphipathic because it has",["A polar head and nonpolar tails","Two hydrophobic heads","Only charged tails","A sugar and peptide chain"],0,"The phosphate head is hydrophilic and fatty acid tails are hydrophobic."],
        ["An enzyme speeds a reaction by",["Increasing the reaction's delta G","Lowering activation energy","Being consumed as a product","Changing the equilibrium constant"],1,"Catalysis lowers the activation barrier without changing delta G or K."],
        ["A carbon atom can form four covalent bonds because it has",["Four valence electrons available for sharing","Four electron shells","No valence electrons","Four extra neutrons"],0,"Carbon has four valence electrons and can complete its octet by sharing."],
        ["A protein loses its functional shape after extreme heat. This most directly reflects disruption of",["Its amino acid sequence","Interactions stabilizing higher-order structure","The genetic code","All peptide bonds in every case"],1,"Heat can disrupt noncovalent interactions that maintain folding."],
        ["Which molecule is a polymer made of nucleotide monomers?",["Glycogen","DNA","Triglyceride","Collagen"],1,"DNA is a nucleic acid polymer of nucleotides."],
        ["A triglyceride consists of",["Glycerol and three fatty acids","Three amino acids and glycerol","Glucose and phosphate","A nucleotide and two sugars"],0,"Three fatty acids attach to one glycerol backbone."],
        ["Water's high specific heat helps organisms because it",["Makes water change temperature slowly","Prevents hydrogen bonding","Makes ice denser than liquid water","Stops metabolic reactions"],0,"Energy is needed to disrupt water interactions, buffering temperature changes."],
        ["A buffer limits pH changes mainly by",["Reversibly accepting or donating H+","Destroying all water molecules","Removing every weak acid","Making the solution nonpolar"],0,"A conjugate acid-base pair responds to added acid or base."],
        ["An amino acid contains which two functional groups?",["Amino and carboxyl","Phosphate and methyl only","Hydroxyl and aldehyde only","Two phosphate groups"],0,"Amino acids have amino and carboxyl groups attached to a central carbon."],
        ["A dehydration synthesis reaction that joins monomers generally",["Consumes water","Releases water","Consumes oxygen gas","Produces ATP in every case"],1,"A water molecule is removed as a covalent bond forms."]
      ]}
    $$::jsonb),
    ('AP Biology', 'Unit 2 Cell Structure & Function', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A cell that secretes many proteins is likely to have abundant",["Rough ER and Golgi apparatus","Lysosomes only","Chloroplasts","Centrioles only"],0,"Rough ER synthesizes secreted proteins; Golgi modifies and packages them."],
        ["A membrane's hydrophobic core most strongly impedes passage of",["Small nonpolar molecules","Oxygen","Charged ions","Steroid hormones"],2,"Charged ions need channels or transporters to cross the nonpolar core."],
        ["An animal cell placed in a hypertonic solution will usually",["Gain water and swell","Lose water and shrink","Remain unchanged because solutes leave first","Burst immediately"],1,"Water moves toward the higher solute concentration."],
        ["Which process directly uses ATP to move ions against their gradient?",["Oxygen diffusion","Facilitated diffusion","Sodium-potassium pump","Osmosis"],2,"The sodium-potassium pump uses ATP for active transport."],
        ["The nucleolus is primarily involved in",["Ribosomal RNA production and ribosome assembly","Lipid digestion","ATP synthesis","Chromosome segregation"],0,"Ribosomal subunits are assembled in the nucleolus."],
        ["A cell with many mitochondria likely has high demand for",["ATP production by aerobic respiration","Lipid storage only","DNA export","Cell wall construction"],0,"Mitochondria generate ATP through aerobic metabolism."],
        ["As a spherical cell's radius increases, its surface-area-to-volume ratio",["Increases","Decreases","Stays constant","Becomes zero immediately"],1,"Area scales as r^2 while volume scales as r^3."],
        ["A membrane protein that binds a hormone and triggers an intracellular response is a",["Receptor","Phospholipid","Ribosome","Cellulose fiber"],0,"Receptors recognize signals and initiate cellular responses."],
        ["Prokaryotic cells differ from eukaryotic cells because prokaryotes",["Lack a membrane-bound nucleus","Lack ribosomes","Always lack DNA","Have mitochondria"],0,"Prokaryotic DNA is not enclosed by a nuclear membrane."],
        ["A plant cell's central vacuole contributes to",["Turgor pressure and storage","Ribosome translation","Chromosome replication","Oxidative phosphorylation"],0,"Water in the vacuole helps press the membrane against the cell wall."],
        ["A secretory vesicle fuses with the plasma membrane to release its contents by",["Endocytosis","Exocytosis","Osmosis","Simple diffusion"],1,"Exocytosis exports vesicle contents outside the cell."],
        ["A drug blocks microtubule polymerization. Which process is most directly impaired?",["Mitotic spindle formation","Glycolysis","DNA base pairing","Lipid bilayer assembly"],0,"Spindle microtubules help separate chromosomes during cell division."],
        ["A solute moves through a channel from high to low concentration. This is",["Active transport","Facilitated diffusion","Endocytosis","Exocytosis"],1,"Channel-mediated movement down a gradient requires no direct ATP input."],
        ["Evidence for the endosymbiotic origin of mitochondria includes that they",["Have circular DNA and bacterial-like ribosomes","Have no membranes","Form by protein translation","Occur only in plants"],0,"Mitochondrial genetic and ribosomal features resemble bacteria."],
        ["A cell wall primarily provides",["Structural support and protection","Selective passage of every molecule","ATP storage","Hormone synthesis"],0,"The wall resists expansion and helps maintain cell shape."]
      ]}
    $$::jsonb),
    ('AP Biology', 'Unit 3 Cellular Energetics', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["An enzyme lowers activation energy by",["Changing delta G","Stabilizing the transition state","Being consumed as a reactant","Increasing product free energy"],1,"Catalysis stabilizes the transition state without changing delta G."],
        ["In aerobic cellular respiration, most ATP is produced by",["Glycolysis","Oxidative phosphorylation","The Calvin cycle","Fermentation"],1,"The electron transport chain and chemiosmosis produce most ATP."],
        ["The net products of glycolysis per glucose include",["2 ATP and 2 NADH","4 ATP and no NADH","1 ATP and 4 NADH","36 ATP"],0,"Glycolysis nets two ATP and produces two NADH per glucose."],
        ["Oxygen's role in aerobic respiration is to",["Donate carbon to glucose","Accept electrons at the end of the electron transport chain","Make ATP directly in glycolysis","Split pyruvate"],1,"Oxygen is the terminal electron acceptor and forms water."],
        ["The light reactions of photosynthesis occur in the",["Thylakoid membrane","Mitochondrial matrix","Cytosol","Nuclear envelope"],0,"Photosystems and electron carriers are embedded in thylakoid membranes."],
        ["The Calvin cycle uses ATP and NADPH to",["Fix CO2 into carbohydrate precursors","Split water and release oxygen","Oxidize glucose","Pump protons into mitochondria"],0,"It reduces fixed carbon using products of the light reactions."],
        ["A competitive inhibitor often reduces enzyme activity because it",["Binds the active site and competes with substrate","Destroys all substrate","Raises temperature","Permanently changes DNA"],0,"Competitive inhibitors compete with substrate for active-site binding."],
        ["Fermentation allows glycolysis to continue by regenerating",["NAD+","Oxygen","FADH2","Glucose"],0,"Fermentation oxidizes NADH and restores NAD+."],
        ["An uncoupler dissipates the mitochondrial proton gradient. ATP production falls because",["Chemiosmosis loses its driving gradient","Glycolysis stops directly","Oxygen is no longer needed","The Calvin cycle accelerates"],0,"ATP synthase depends on the proton-motive force."],
        ["A reaction with negative delta G is",["Exergonic and thermodynamically favorable","Endergonic","At equilibrium necessarily","Impossible to catalyze"],0,"Negative free-energy change indicates a favorable forward process."],
        ["The oxygen released during photosynthesis comes from",["Carbon dioxide","Glucose","Water","Chlorophyll"],2,"Water splitting supplies electrons and releases molecular oxygen."],
        ["At very high temperature, enzyme activity can fall because",["The active-site structure can denature","Substrates stop moving","Delta G must become positive","Enzyme concentration becomes zero"],0,"Heat can disrupt interactions that maintain the enzyme's shape."],
        ["The mitochondrial electron transport chain creates an H+ gradient by",["Pumping protons across a membrane","Breaking glucose in the cytosol","Hydrolyzing DNA","Reducing carbon dioxide"],0,"Electron energy drives proton pumping across the inner membrane."],
        ["If carbon dioxide limits photosynthesis, adding more light alone may",["Have little effect on the rate","Always double carbon fixation","Stop respiration","Increase CO2 supply"],0,"A different limiting resource constrains the response."],
        ["ATP hydrolysis can drive an unfavorable reaction through",["Energy coupling","Denaturation","Osmosis","Competitive inhibition"],0,"Coupling makes the combined free-energy change favorable."]
      ]}
    $$::jsonb),
    ('AP Biology', 'Unit 4 Cell Communication & Cell Cycle', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["A steroid hormone can often cross the plasma membrane and bind",["An intracellular receptor","A ribosome outside the cell","DNA polymerase in blood","A cell-wall receptor"],0,"Lipid-soluble steroids can diffuse through membranes to intracellular receptors."],
        ["A signaling cascade amplifies a signal when",["One activated molecule activates many downstream molecules","A receptor is removed before binding","The signal remains outside the cell","Every step destroys the signal"],0,"One active component can activate many copies of the next component."],
        ["A cell lacking a receptor for a hormone will most likely",["Fail to respond despite hormone presence","Respond more strongly","Produce the hormone automatically","Divide in every case"],0,"Specific receptor recognition is needed to initiate the response."],
        ["Cyclins regulate cell-cycle progression by",["Activating cyclin-dependent kinases at specific times","Destroying chromosomes","Replicating DNA directly","Forming the cell membrane"],0,"Cyclin levels regulate CDK activity and cycle transitions."],
        ["DNA replication occurs during",["G1 phase","S phase","G2 phase","M phase"],1,"The S phase is when DNA is synthesized."],
        ["A checkpoint detects unreplicated DNA before mitosis. The likely response is",["Delay progression until replication is complete","Immediate cytokinesis","Chromosome degradation","Permanent activation of all CDKs"],0,"Checkpoints delay division until essential processes are finished."],
        ["During apoptosis, a damaged cell",["Activates a regulated cell-death program","Always becomes cancerous","Undergoes meiosis","Stops all gene expression first"],0,"Apoptosis is a regulated process that removes cells."],
        ["Ligand binding causes a receptor tyrosine kinase to dimerize. This can initiate",["Phosphorylation signaling","DNA translation","Osmosis","Chromosome crossing over"],0,"Dimerization activates kinase domains and downstream pathways."],
        ["Gap junctions in animal cells allow",["Direct passage of small molecules between neighboring cells","Transfer of chromosomes","Secretion of all proteins","Fusion of nuclei"],0,"Gap junction channels connect neighboring cytoplasms."],
        ["A mutation makes a growth-promoting signaling protein active without ligand. This may",["Drive excess cell division","Block all DNA synthesis","Necessarily increase apoptosis","Prevent receptor formation"],0,"Constitutive growth signaling can bypass normal control."],
        ["Sister chromatids separate during mitosis in",["Prophase","Metaphase","Anaphase","Telophase"],2,"Anaphase moves sister chromatids toward opposite poles."],
        ["A diploid cell has 2n=10 chromosomes. Each normal gamete after meiosis has",["2 chromosomes","5 chromosomes","10 chromosomes","20 chromosomes"],1,"Meiosis halves the chromosome number."],
        ["A paracrine signal typically acts",["On nearby cells","Only on the same cell","Across the body through blood","Only inside the nucleus"],0,"Paracrine signaling acts locally on neighboring cells."],
        ["A cell in G0 is",["Not actively progressing through the cell cycle","Replicating DNA","In metaphase","Completing cytokinesis"],0,"G0 is a quiescent state outside the active cycle."],
        ["Protein phosphatases commonly",["Remove phosphate groups from proteins","Copy DNA","Add amino acids to tRNA","Build cellulose"],0,"Phosphatases reverse phosphorylation by removing phosphate groups."]
      ]}
    $$::jsonb),
    ('AP Biology', 'Unit 5 Heredity', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["In a cross Aa x Aa with complete dominance, the expected fraction with the recessive phenotype is",["1/4","1/2","3/4","1"],0,"Only aa offspring show the recessive phenotype."],
        ["A testcross of an individual with a dominant phenotype uses a",["Homozygous recessive individual","Homozygous dominant individual","Different species","Random phenotype"],0,"Recessive offspring reveal whether the unknown carries a recessive allele."],
        ["Two genes show 8% recombinant offspring. They are likely",["Unlinked","Linked relatively close together","The same allele","Both dominant"],1,"Low recombination frequency indicates close linkage."],
        ["Independent assortment results from random orientation of homologous pairs during",["Metaphase I","Prophase II","Anaphase II","Cytokinesis"],0,"Pair orientations at metaphase I generate different allele combinations."],
        ["Nondisjunction during meiosis can produce gametes with",["Abnormal chromosome numbers","Only normal haploid sets","No alleles","Identical DNA sequences"],0,"Failure to separate chromosomes changes chromosome counts."],
        ["A heterozygote in coupling phase AB/ab is testcrossed to ab/ab. Many AB and ab offspring with few recombinants suggest the genes are",["Linked","Unlinked","Alleles of one locus","Always sex-linked"],0,"Excess parental combinations indicate linkage."],
        ["A carrier mother for an X-linked recessive trait and an unaffected father have a son. The probability he is affected is",["0","1/4","1/2","1"],2,"A son receives his X chromosome from his mother."],
        ["A trait with a continuous range of values is often influenced by",["One gene only","Many genes and environment","Mitochondria only","No inherited factors"],1,"Polygenic and environmental effects can produce continuous variation."],
        ["An RrYy individual produces which gametes under independent assortment?",["Rr and Yy","RY, Ry, rY, and ry in equal proportions","RR and yy only","RY only"],1,"Each allele pair segregates independently into four combinations."],
        ["Red and white flowers produce all pink heterozygous offspring. This pattern is",["Incomplete dominance","Complete dominance","Codominance","Sex linkage"],0,"The heterozygote has an intermediate phenotype."],
        ["In codominance, a heterozygote",["Shows both allele products distinctly","Has only an intermediate phenotype","Expresses neither allele","Is always lethal"],0,"Both allele products are expressed in the phenotype."],
        ["Crossing over occurs between nonsister chromatids during",["Prophase I","Metaphase II","Anaphase I","Telophase II"],0,"Homologous chromosomes pair and exchange segments in prophase I."],
        ["A person with genotype IAIB has which ABO blood type?",["A","B","AB","O"],2,"A and B alleles are codominantly expressed."],
        ["A dominant-phenotype individual with genotype unknown may be",["Homozygous dominant or heterozygous","Only homozygous dominant","Only heterozygous","Homozygous recessive"],0,"Both AA and Aa show the dominant phenotype."],
        ["A genetic map distance of 12 cM corresponds approximately to",["12% recombinant offspring","12% affected individuals","88% crossover in every meiosis","12 genes"],0,"Map distance estimates recombination frequency for linked loci."]
      ]}
    $$::jsonb),
    ('AP Biology', 'Unit 6 Gene Expression & Regulation', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["During transcription, RNA polymerase reads the DNA template strand",["3 prime to 5 prime and synthesizes RNA 5 prime to 3 prime","5 prime to 3 prime and synthesizes RNA 3 prime to 5 prime","In either direction randomly","Only after translation"],0,"Polymerases extend RNA in the 5 prime to 3 prime direction."],
        ["A DNA coding strand is 5'-ATG CCA-3'. The corresponding mRNA is",["5'-AUG CCA-3'","5'-UAC GGU-3'","3'-TAC GGT-5'","5'-ATG CCA-3'"],0,"The coding strand matches mRNA except RNA uses U instead of T."],
        ["A tRNA anticodon pairs directly with",["A codon on mRNA","A promoter on DNA","An amino acid side chain","A ribosomal protein"],0,"Codon-anticodon pairing positions the tRNA's amino acid."],
        ["A point mutation changes a codon but not its amino acid. It is",["Silent","Nonsense","Frameshift","Missense"],0,"The genetic code is redundant, so some substitutions are synonymous."],
        ["Insertion of one nucleotide within a coding sequence usually causes",["A downstream frameshift","Only one amino acid substitution","No possible effect","A larger chromosome"],0,"A one-base insertion changes the triplet reading frame."],
        ["Eukaryotic pre-mRNA is processed by",["Capping, polyadenylation, and intron splicing","Removing all exons","Replacing uracil with thymine","Translation before transcription"],0,"These modifications produce mature mRNA."],
        ["In an inducible operon, an inducer can activate transcription by",["Binding and inactivating a repressor","Binding the operator permanently","Destroying RNA polymerase","Changing the DNA sequence"],0,"Inducer binding changes repressor shape so it no longer blocks transcription."],
        ["A mutation in a promoter may reduce gene expression by",["Reducing RNA polymerase binding","Changing every amino acid in a protein","Preventing all DNA replication","Destroying ribosomes"],0,"Promoters recruit transcription machinery."],
        ["A nonsense mutation is likely to",["Create a premature stop codon","Replace one amino acid only","Leave codon meaning unchanged","Delete a promoter"],0,"A stop codon can terminate translation early."],
        ["A transcription factor binds an enhancer. This can",["Alter transcription rate of a target gene","Directly synthesize a protein","Translate mRNA into DNA","Remove a chromosome"],0,"Enhancers regulate transcription through DNA-binding proteins."],
        ["Translation terminates when a ribosome encounters",["A stop codon","A promoter","An intron","A start codon only"],0,"Release factors recognize stop codons."],
        ["A substitution changes an amino-acid codon to a stop codon. This is a",["Silent mutation","Nonsense mutation","Conservative missense only","Chromosomal inversion"],1,"A premature stop codon defines a nonsense mutation."],
        ["In eukaryotes, translation occurs primarily at",["Ribosomes","DNA polymerase","The Golgi lumen","Centrioles"],0,"Ribosomes decode mRNA into a polypeptide."],
        ["A cell can produce different proteins from one gene through",["Alternative RNA splicing","DNA replication only","Translation reversal","Deleting every intron from DNA"],0,"Different exon combinations can be joined into mature transcripts."],
        ["A mutation in a coding region changes one amino acid but preserves the reading frame. It is",["Missense","Nonsense","Silent","Frameshift"],0,"A missense mutation changes the encoded amino acid."]
      ]}
    $$::jsonb),
    ('AP Biology', 'Unit 7 Natural Selection', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["Antibiotic resistance rises after treatment because",["Bacteria choose to adapt","Heritable resistant variants leave more offspring","Antibiotics make all cells identical","Mutation stops"],1,"Selection changes variant frequencies through differential reproductive success."],
        ["Natural selection requires",["Heritable variation affecting reproductive success","No genetic variation","Identical reproductive success","Traits acquired in adult life"],0,"Selection requires inherited differences in fitness."],
        ["Intermediate body sizes survive best while both extremes fare poorly. This is",["Directional selection","Stabilizing selection","Disruptive selection","Artificial selection"],1,"Stabilizing selection favors intermediate phenotypes."],
        ["A rare allele becomes common after a few individuals found an island population. This is",["Founder effect","Gene flow","Directed mutation","Assortative mating"],0,"Chance allele sampling among founders can shift frequencies."],
        ["If p=0.7 and q=0.3, the expected heterozygote frequency under Hardy-Weinberg equilibrium is",["0.09","0.21","0.42","0.49"],2,"2pq=2(0.7)(0.3)=0.42."],
        ["Migration between populations generally",["Increases genetic differentiation","Reduces genetic differentiation","Eliminates mutation","Causes only drift"],1,"Gene flow mixes alleles between populations."],
        ["A resistance variant present before pesticide use demonstrates",["Selection on standing variation","Directed mutation","Acquired inheritance","No evolution"],0,"The pesticide selects preexisting resistant individuals."],
        ["A trait with low heritability is expected to show",["A large inherited response to selection","A limited inherited response to selection","No environmental influence","Mutation alone"],1,"Low heritability means phenotypic differences are less transmissible."],
        ["A fossil sequence showing changes in limb anatomy over time supports",["Evolution through time","No common ancestry","Acclimation only","Genetic equilibrium"],0,"Ordered fossils document morphological change through geologic time."],
        ["Similar adaptations evolving independently in similar environments are an example of",["Convergent evolution","Divergent evolution","Genetic drift","Artificial selection"],0,"Similar selection pressures can produce analogous traits."],
        ["A geographic barrier most directly reduces",["Gene flow","Mutation","Natural selection","Recombination"],0,"Separation limits migration and allele exchange."],
        ["If q=0.2, the expected recessive homozygote frequency is",["0.04","0.16","0.32","0.64"],0,"q squared is 0.2 squared=0.04."],
        ["Which process can change allele frequencies between generations?",["Natural selection","Mitosis alone","Homeostasis","Individual learning"],0,"Differential reproduction can change allele frequencies."],
        ["Different species have homologous forelimb bones adapted to different tasks. This supports",["Common ancestry","Identical niches","No evolutionary relationship","Only identical selection"],0,"Homologous structures are evidence of shared ancestry."],
        ["Human-directed breeding of crops for drought tolerance is",["Artificial selection","Genetic drift","Gene flow","Stabilizing natural selection"],0,"Humans choose which individuals reproduce." ]
      ]}
    $$::jsonb),
    ('AP Biology', 'Unit 8 Ecology', 'mcq', $$
      {"seed":"premium-core-v1","questions":[
        ["In logistic growth, population growth rate slows as population size approaches",["Zero","Carrying capacity","Mutation rate","Birth rate"],1,"Density-dependent limits slow growth near carrying capacity."],
        ["A population grows from 450 to 510 individuals in one year. Its numerical change is",["60 individuals","480 individuals","510 individuals","960 individuals"],0,"The change is 510-450=60 individuals."],
        ["Energy transfer between trophic levels is inefficient largely because",["Organisms release heat during metabolism","Energy is fully recycled","Producers do not respire","Consumers create energy"],0,"Metabolism dissipates much energy as heat."],
        ["Removing a common producer from a food web is likely to affect",["Only decomposers","Many consumer populations","Only abiotic factors","No other trophic levels"],1,"Producers supply energy to downstream trophic levels."],
        ["Excess nutrient runoff can cause algal blooms followed by",["Permanent oxygen increase","Oxygen depletion during decomposition","Immediate desertification","Reduced nutrients initially"],1,"Decomposer respiration can consume dissolved oxygen."],
        ["An ecological community includes",["All interacting populations in an area","One species and abiotic conditions","One population's genes","The entire biosphere"],0,"Communities consist of populations of different species."],
        ["A realized niche may be narrower than a fundamental niche because of",["Competition","Photosynthesis","Mutation","Season length only"],0,"Biotic interactions restrict the resources and conditions a species uses."],
        ["Which is most clearly density independent?",["A hurricane","Competition for nesting sites","Disease transmission","Territorial conflict"],0,"A storm can affect individuals regardless of population density."],
        ["A species benefits while its host is harmed in",["Commensalism","Mutualism","Parasitism","Neutralism"],2,"Parasites gain resources at a host's expense."],
        ["Early colonizers on newly exposed bare rock are often",["Lichens and microbes","Large mammals","Mature canopy trees","Top predators"],0,"Pioneer species tolerate bare substrate and facilitate succession."],
        ["A keystone species is one that has",["A disproportionately large effect on community structure","The greatest biomass in every ecosystem","No competitors","Only a producer role"],0,"Its removal can reorganize the community disproportionately."],
        ["Matter differs from energy in ecosystems because matter",["Cycles among organisms and the environment","Is lost as heat at each trophic transfer","Is created by producers","Cannot enter consumers"],0,"Elements are reused through biogeochemical cycles."],
        ["In mutualism",["Both species benefit","One benefits and one is harmed","One benefits and the other is unaffected","Both are harmed"],0,"Both partners gain a fitness benefit."],
        ["A large prereproductive cohort often suggests",["Potential future population growth","Immediate extinction","No future births","A necessarily smaller carrying capacity"],0,"Many young individuals may later enter reproductive ages."],
        ["After a predator is removed, prey rise and vegetation declines. This pattern is",["A trophic cascade","Primary succession","Mutualism","Abiotic limitation only"],0,"Predator effects can propagate across multiple trophic levels."]
      ]}
    $$::jsonb)
)
insert into public.premium_content (course, content_key, content_type, content)
select seed.course, seed.content_key, seed.content_type, seed.content
from seed
where not exists (
  select 1 from public.premium_content existing
  where existing.course = seed.course
    and existing.content_key = seed.content_key
    and existing.content_type = seed.content_type
    and existing.content->>'seed' = 'premium-core-v1'
);
