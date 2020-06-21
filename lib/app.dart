import 'package:breakpoint/breakpoint.dart';
import 'package:flutter/material.dart';
import 'package:responsive_scaffold/responsive_scaffold.dart';

import 'about.dart';
import 'home.dart';
import 'menu.dart';
import 'recipe/recipe_list.dart';

const homeRoute = '/';
const aboutRoute = '/about';
const recipeRoute = '/recipes';

class App extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // Description
      title: 'Kurry',
      // Theme
      theme: ThemeData.light(),
      darkTheme: ThemeData.dark(),
      // Routes
      initialRoute: homeRoute,
      routes: {
        homeRoute: (context) => AppScaffold(
              title: 'Kurry - an open source cook platform',
              body: Home(),
            ),
        recipeRoute: (context) => AppScaffold(
              title: 'Manage your recipes',
              body: RecipeList(),
            ),
        aboutRoute: (context) => AppScaffold(
              title: 'About app',
              body: About(),
            ),
      },
    );
  }
}

class AppScaffold extends StatelessWidget {
  final String title;
  final Widget body;
  final Widget floatingAction;

  const AppScaffold({this.title, this.body, this.floatingAction});

  @override
  Widget build(BuildContext context) {
    final breakpoint = Breakpoint.fromMediaQuery(context);
    return ResponsiveScaffold(
      title: Text(title),
      drawer: Menu(),
      body: Container(
        child: body,
        padding: EdgeInsets.all(breakpoint.gutters),
      ),
      floatingActionButton: floatingAction,
    );
  }
}
