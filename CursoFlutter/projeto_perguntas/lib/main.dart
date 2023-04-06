import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  var perguntaSel = 0;

  void responder() {
    setState(() {
      perguntaSel++;
    });
    print('Pergunta respondida!');
  }

  @override
  Widget build(BuildContext context) {
    final List<String> perguntas = [
      'Qual é a sua cor favorita?',
      'Qual é o seu animal favorito?'
    ];

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("Perguntas"),
        ),
        body: Column(
          children: [
            Text(perguntas[perguntaSel]),
            RaisedButton(
              onPressed: responder,
              child: const Text('Resposta 1'),
            ),
            RaisedButton(
              onPressed: responder,
              child: const Text('Resposta 2'),
            ),
            RaisedButton(
              onPressed: responder,
              child: const Text('Resposta 2'),
            ),
          ],
        ),
      ),
    );
  }
}