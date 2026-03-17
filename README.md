# radar-pcp3panel-vis

The system supports two device states:
Folded state -> single-panel radar chart (click fold button)
Unfolded state -> three synchronized parallel coordinates panels + Radar chart

interactions:
click line -> highlight the line across panels
click axis -> highlight the axis and show values for each data object
click polygon -> select player + highlight
click empty space -> reset selection
Interactions are also possible through controller

requirements:
- chrome or safari
- local host
- enable pop ups (required for the panels to unfold)

Radar chart : http://localhost..../radar.html
Panel 1 : http://localhost..../panel1.html
Panel 2 : http://localhost..../panel2.html
Panel 3 : http://localhost..../panel3.html
Controller page: Panel 1 : http://localhost..../controller.html

!!!
When each page is opened manually on browsers through its link (not by unfold button on controller), the state on the controller won't change (stay on folded mode) and as consequence, fold/unfold can't be done through controller. However, the selection functions across pages will still work.